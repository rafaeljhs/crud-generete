import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativeComponent } from './administrative.component';

const routes: Routes = [
  {path: '', redirectTo: '/administrative', pathMatch: 'full'},
  { path: 'administrative', component: AdministrativeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeRoutingModule { }
