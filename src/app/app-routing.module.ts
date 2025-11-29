import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'security',
    pathMatch: 'full',
  },
  {
    path: 'absences',
    loadChildren: () => import('./pages/absences/absences.module').then( m => m.AbsencesPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_ATTACHE'] }
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
