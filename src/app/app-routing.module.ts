import { UserRole } from './core/models/auth.models';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
  { path: '', redirectTo: '/master', pathMatch: 'full' },
  {
    path: 'master',
    component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.MASTER]},
  },
  {
    path: 'administrative',
    loadChildren: () => import('./pages/administrative/administrative.module').then(m => m.AdministrativeModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.ISSUER]},
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
