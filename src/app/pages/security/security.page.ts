import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
  imports: [LoginComponent],
})
export class SecurityPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
