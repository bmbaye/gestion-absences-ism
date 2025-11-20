import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbsenceDetails } from 'src/app/models/absence-details';

@Injectable({
  providedIn: 'root',
})
export class AbsencesService {
  private absenceSource = new BehaviorSubject<AbsenceDetails | null>(null);
  absenceSelected$ = this.absenceSource.asObservable();

  setAbsence(absence: AbsenceDetails) {
    this.absenceSource.next(absence);
  }

  constructor() {}
}
