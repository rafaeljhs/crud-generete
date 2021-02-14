import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionCourseListComponent } from './institution-course/institution-course-list/institution-course-list.component';
import { InstitutionListComponent } from './institution/institution-list/institution-list.component';
import { InstitutionManagerComponent } from './institution/institution-manager/institution-manager.component';
import { IssuerListComponent } from './issuer/issuer-list/issuer-list.component';
import { IssuerManagerComponent } from './issuer/issuer-manager/issuer-manager.component';



const routes: Routes = [
  { path: '', redirectTo: '/master/issuer/list', pathMatch: 'full' },
  {
    path: 'issuer/list',
    component: IssuerListComponent
  },
  {
    path: 'issuer/managing',
    component: IssuerManagerComponent,
  },
  {
    path: 'issuer/managing/:id',
    component: IssuerManagerComponent,
  },
  {
    path: 'institution/list',
    component: InstitutionListComponent
  },
  // {
  //   path: 'institution/managing',
  //   component: InstitutionManagerComponent,
  // },
  // {
  //   path: 'institution/managing/:id',
  //   component: InstitutionManagerComponent,
  // },
  {
    path: 'institution-course/list',
    component: InstitutionCourseListComponent
  },
  // {
  //   path: 'institutioncourse/managing',
  //   component: InstitutionCourseManagerComponent,
  // },
  // {
  //   path: 'institutioncourse/managing/:id',
  //   component: InstitutionCourseManagerComponent,
  // },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
