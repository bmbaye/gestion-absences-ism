import { Component, OnInit } from '@angular/core';
import { AbsenceDetails } from 'src/app/models/absence-details';
import { AbsencesService } from '../absences-service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent  implements OnInit {
    oneAbsence : AbsenceDetails | null = null;
  

  constructor(private absenceService : AbsencesService) { }

  ngOnInit() {
    this.absenceService.absenceSelected$.subscribe(absence => {
      this.oneAbsence = absence;
    });
  }

}
