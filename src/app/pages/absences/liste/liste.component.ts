import { Component, OnInit } from '@angular/core';
import { AbsenceDetails } from 'src/app/models/absence-details';
import { AbsencesService } from '../absences-service';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
  imports: [IonicModule, ɵInternalFormsSharedModule, ReactiveFormsModule, NgFor],
})
export class ListeComponent  implements OnInit {

    oneAbsence : AbsenceDetails | null = null;
    formulaireFiltre : FormGroup = this.fb.group({
      classe: [''],
      nomPrenom: [''],
      date: ['']
    });;
    absences : AbsenceDetails[] = [];
    absencesFiltres : AbsenceDetails[] = [];

  constructor(private absenceService: AbsencesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadAbsences();

    this.formulaireFiltre.valueChanges.subscribe(() => {
      console.log("Filtres modifiés :", this.formulaireFiltre.value);
      this.appliquerFiltres();
    });

    this.appliquerFiltres();
  }

  loadAbsences() {
    this.absences = [
      {
        "nom" : "XXXXXX1",
        "prenom" : "YYYYYY1",
        "naissances" : "2000-10-10",
        "matricule" : "MAT-0000-0000-0001",
        "classe" : "L3GLRS",
        "date" : "2024-01-01",
        "cours": "java",
        "horaire":  "08h- 10h",
        "justifiee" : "OUI",
        "titre" : "Maladie",
        "motif" : "Grippehhshh hggsgg sggsgg ",
      },
      {
        "nom" : "XXXXXX2",
        "prenom" : "YYYYYY2",
        "naissances" : "2001-02-20",
        "matricule" : "MAT-0000-0000-0002",
        "classe" : "L3GLRS",
        "date" : "2024-02-02",
        "cours": "java",
        "horaire":  "08h- 10h",
        "justifiee" : "NON",
        "titre" : "Inconnu",
        "motif" : "Absence non justifiée",
      },
      {
        "nom" : "XXXXXX3",
        "prenom" : "YYYYYY3",
        "naissances" : "2002-03-15",
        "matricule" : "MAT-0000-0000-0003",
        "classe" : "L3GLRS",
        "date" : "2024-03-03",
        "cours": "java",
        "horaire":  "08h- 10h",
        "justifiee" : "OUI",
        "titre" : "Rendez-vous familial",
        "motif" : "Voyage imprévu pour des raisons familiales",
      },
      {
        "nom" : "XXXXXX4",
        "prenom" : "YYYYYY4",
        "naissances" : "2002-03-15",
        "matricule" : "MAT-0000-0000-0004",
        "classe" : "L3GLRS",
        "date" : "2024-03-03",
        "cours": "java",
        "horaire":  "08h- 10h",
        "justifiee" : "OUI",
        "titre" : "Rendez-vous familial",
        "motif" : "Voyage imprévu pour des raisons familiales",
      },
      {
        "nom" : "XXXXXX5",
        "prenom" : "YYYYYY5",
        "naissances" : "2002-03-15",
        "matricule" : "MAT-0000-0000-0005",
        "classe" : "L3GLRS",
        "date" : "2024-03-03",
        "cours": "java",
        "horaire":  "08h- 10h",
        "justifiee" : "OUI",
        "titre" : "Rendez-vous familial",
        "motif" : "Voyage imprévu pour des raisons familiales",
      },
    ];

  }

  appliquerFiltres() {
    if (!this.formulaireFiltre) return;
    const filtres = this.formulaireFiltre.value;
    let results = [...this.absences];

    if (filtres.classe) {
      results = results.filter(absence =>
        absence.classe.toLowerCase().includes(filtres.classe.toLowerCase())
      );

      if(results.length === 1) {
        filtres.nomPrenom = results[0].nom + ' ' + results[0].prenom;
        filtres.date = results[0].date;
        this.formulaireFiltre.patchValue({
          nomPrenom: filtres.nomPrenom,
          date: filtres.date
        }, { emitEvent: false });
      }
    }

    if (filtres.nomPrenom) {
      results = results.filter(absence =>
        (absence.nom + ' ' + absence.prenom).toLowerCase().includes(filtres.nomPrenom.toLowerCase())
      );
      if(results.length === 1) {
        filtres.classe = results[0].classe + ' ' + results[0].prenom;
        filtres.date = results[0].date;
        this.formulaireFiltre.patchValue({
          classe: filtres.classe,
          date: filtres.date
        }, { emitEvent: false });
      }
    }

    if (filtres.date) {
      results = results.filter(absence =>
        absence.date === filtres.date

      );
      if(results.length === 1) {
        filtres.nomPrenom = results[0].nom + ' ' + results[0].prenom;
        filtres.classe = results[0].classe;
        this.formulaireFiltre.patchValue({
          nomPrenom: filtres.nomPrenom,
          classe: filtres.classe
        }, { emitEvent: false });
      }
    }
    this.absencesFiltres = results;
  }

  resetFiltres():void {
    this.formulaireFiltre.reset({
        classe: '',
        nomPrenom: '',
        date: ''
      }
    );
    this.appliquerFiltres();
  }

  detailAbsence(absence: AbsenceDetails) {
      this.absenceService.setAbsence(absence);
    }

}
