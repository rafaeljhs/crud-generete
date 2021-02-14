import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativeComponent } from './administrative.component';

const routes: Routes = [
  {path: '', redirectTo: '/crud', pathMatch: 'full'},
  { path: 'crud', component: CrudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
