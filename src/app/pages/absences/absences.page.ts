import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { AbsenceDetails } from 'src/app/models/absence-details';
import { ListeComponent } from "./liste/liste.component";
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.page.html',
  styleUrls: ['./absences.page.scss'],
  imports: [ListeComponent, DetailsComponent],
})
export class AbsencesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  oneAbsence : AbsenceDetails | null = null;

  absences = [
    {
      "nom" : "XXXXXX1",
      "prenom" : "YYYYYY1",
      "naissances" : "10/10/2000",
      "matricule" : "MAT-0000-0000-0001",
      "classe" : "L3GLRS",
      "date" : "01/01/2024",
      "cours": "java",
      "horaire":  "08h- 10h",
      "justifiee" : "OUI",
      "titre" : "Maladie",
      "motif" : "Grippehhshh hggsgg sggsgg ",
    },
    {
      "nom" : "XXXXXX2",
      "prenom" : "YYYYYY2",
      "naissances" : "20/02/2001",
      "matricule" : "MAT-0000-0000-0002",
      "classe" : "L3GLRS",
      "date" : "02/02/2024",
      "cours": "java",
      "horaire":  "08h- 10h",
      "justifiee" : "NON",
      "titre" : "Inconnu",
      "motif" : "Absence non justifiée",
    },
    {
      "nom" : "XXXXXX3",
      "prenom" : "YYYYYY3",
      "naissances" : "15/03/2002",
      "matricule" : "MAT-0000-0000-0003",
      "classe" : "L3GLRS",
      "date" : "03/03/2024",
      "cours": "java",
      "horaire":  "08h- 10h",
      "justifiee" : "OUI",
      "titre" : "Rendez-vous familial",
      "motif" : "Voyage imprévu pour des raisons familiales",
    },
    {
      "nom" : "XXXXXX4",
      "prenom" : "YYYYYY4",
      "naissances" : "15/03/2002",
      "matricule" : "MAT-0000-0000-0004",
      "classe" : "L3GLRS",
      "date" : "03/03/2024",
      "cours": "java",
      "horaire":  "08h- 10h",
      "justifiee" : "OUI",
      "titre" : "Rendez-vous familial",
      "motif" : "Voyage imprévu pour des raisons familiales",
    },
    {
      "nom" : "XXXXXX5",
      "prenom" : "YYYYYY5",
      "naissances" : "15/03/2002",
      "matricule" : "MAT-0000-0000-0005",
      "classe" : "L3GLRS",
      "date" : "03/03/2024",
      "cours": "java",
      "horaire":  "08h- 10h",
      "justifiee" : "OUI",
      "titre" : "Rendez-vous familial",
      "motif" : "Voyage imprévu pour des raisons familiales",
    },
  ];

  detailAbsence(absence: AbsenceDetails) {
    this.oneAbsence = absence;
  }

}
