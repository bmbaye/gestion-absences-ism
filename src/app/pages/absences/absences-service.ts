import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbsenceDetails } from 'src/app/models/absence-details';
import { RestResponse } from 'src/app/models/rest-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AbsencesService {
  private absenceSource = new BehaviorSubject<AbsenceDetails | null>(null);
  absenceSelected$ = this.absenceSource.asObservable();

  private apiUrl = environment.apiUrl + '/absences';

  setAbsence(absence: AbsenceDetails) {
    this.absenceSource.next(absence);
  }

  constructor(private http : HttpClient) {}

  getAbsences(ecoleId : String, niveau: String, page:number, size: number): Observable<RestResponse<AbsenceDetails>>{
    return this.http.get<RestResponse<AbsenceDetails>>(`${this.apiUrl}/ecole/${ecoleId}?niveau=${niveau}&page=${page}&size=${size}`);
  }
}
