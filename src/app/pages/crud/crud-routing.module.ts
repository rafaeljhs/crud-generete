import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud.component';

const routes: Routes = [
  {path: '', redirectTo: '/crud', pathMatch: 'full'},
  { path: 'crud', component: CrudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
