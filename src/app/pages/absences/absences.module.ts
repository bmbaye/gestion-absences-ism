import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbsencesPageRoutingModule } from './absences-routing.module';

import { AbsencesPage } from './absences.page';
import { ListeComponent } from './liste/liste.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbsencesPageRoutingModule,
    AbsencesPage,
    ListeComponent,
    ReactiveFormsModule
  ],
})
export class AbsencesPageModule {}
