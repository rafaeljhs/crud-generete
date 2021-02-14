import { InputFormModule } from './../../components/input-form/input-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { IssuerListComponent } from './issuer/issuer-list/issuer-list.component';
import { IssuerManagerComponent } from './issuer/issuer-manager/issuer-manager.component';
import { UIModule } from 'src/app/components/ui/ui.module';
import { ModalCropModule } from 'src/app/components/modal-crop/modal-crop.module';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { InstitutionListComponent } from './institution/institution-list/institution-list.component';
import { InstitutionManagerComponent } from './institution/institution-manager/institution-manager.component';
import { InstitutionCourseListComponent } from './institution-course/institution-course-list/institution-course-list.component';
import { InstitutionCourseManagerComponent } from './institution-course/institution-course-manager/institution-course-manager.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    IssuerListComponent,
    IssuerManagerComponent,
    InstitutionListComponent,
    InstitutionManagerComponent,
    InstitutionCourseListComponent,
    InstitutionCourseManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasterRoutingModule,
    NgbPaginationModule,
    InputFormModule,
    NgbAlertModule,
    UIModule,
    ModalCropModule,
    FileUploadModule,
    NgSelectModule,
    NgxMaskModule.forRoot()
  ]
})
export class MasterModule { }
