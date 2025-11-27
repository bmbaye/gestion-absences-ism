import { Component, HostListener, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AbsenceDetails } from 'src/app/models/absence-details';
import { AbsencesService } from '../absences-service';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
  imports: [IonicModule, ɵInternalFormsSharedModule, ReactiveFormsModule, NgIf],
})
export class ListeComponent implements OnInit, OnDestroy {
  @ViewChild('absencesList') absencesList!: ElementRef;

  oneAbsence: AbsenceDetails | null = null;
  formulaireFiltre: FormGroup;
  absences: AbsenceDetails[] = [];
  absencesFiltres: AbsenceDetails[] = [];
  ecoleId: String = '68e4e8f61fb2ee0515d6e78c';
  niveau: String = 'L3';
  page: number = 0;
  size: number = 15; 
  hasNext: boolean = true;
  loading: boolean = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private absenceService: AbsencesService, private fb: FormBuilder) {
    this.formulaireFiltre = this.fb.group({
      classe: [''],
      nomPrenom: [''],
      date: ['']
    });
  }

  ngOnInit() {
    this.loadAbsences();

    this.formulaireFiltre.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.appliquerFiltres();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAbsences() {
    if (this.loading || !this.hasNext) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.absenceService.getAbsences(this.ecoleId, this.niveau, this.page, this.size)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.absences = [...this.absences, ...response.result];
          
          this.hasNext = response.hasNext;
          this.page += 1;
          
          this.appliquerFiltres();
          
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des absences.';
          console.error('Erreur lors du chargement des absences :', err);
          this.loading = false;
        }
      });
  }

  onScrollList(event: any): void {
    const element = event.target;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const scrollHeight = element.scrollHeight;

    if (scrollPosition >= scrollHeight - 100) {
      this.loadAbsences();
    }
  }

  appliquerFiltres() {
    if (!this.formulaireFiltre) return;
    
    const filtres = this.formulaireFiltre.value;
    let results = [...this.absences];

    if (filtres.classe && filtres.classe.trim()) {
      results = results.filter(absence =>
        absence.classe.toLowerCase().includes(filtres.classe.toLowerCase().trim())
      );
    }

    if (filtres.nomPrenom && filtres.nomPrenom.trim()) {
      results = results.filter(absence =>
        (absence.nom + ' ' + absence.prenom).toLowerCase()
          .includes(filtres.nomPrenom.toLowerCase().trim())
      );
    }

    if (filtres.date) {
      results = results.filter(absence =>
        absence.dateAbsence === filtres.date
      );
    }

    this.absencesFiltres = results;

    if (results.length === 1) {
      this.autoCompleterFiltre(results[0], filtres);
    }
  }

  private autoCompleterFiltre(absence: AbsenceDetails, filtres: any) {
    const updates: any = {};

    if (!filtres.classe) {
      updates.classe = absence.classe;
    }
    if (!filtres.nomPrenom) {
      updates.nomPrenom = `${absence.nom} ${absence.prenom}`;
    }
    if (!filtres.date) {
      updates.date = absence.dateAbsence;
    }

    if (Object.keys(updates).length > 0) {
      this.formulaireFiltre.patchValue(updates, { emitEvent: false });
    }
  }

  resetFiltres(): void {
    this.formulaireFiltre.reset({
      classe: '',
      nomPrenom: '',
      date: ''
    });
    this.appliquerFiltres();
  }

  get nombreAbsences(): number {
    return this.absencesFiltres.length;
  }

  detailAbsence(absence: AbsenceDetails) {
    this.absenceService.setAbsence(absence);
  }
}