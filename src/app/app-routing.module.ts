import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'abesences',
    pathMatch: 'full'
  },
  {
    path: 'absences',
    loadChildren: () => import('./pages/absences/absences.module').then( m => m.AbsencesPageModule)
  },
  {
    path: 'cours',
    loadChildren: () => import('./pages/cours/cours.module').then( m => m.CoursPageModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./pages/security/security.module').then( m => m.SecurityPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
