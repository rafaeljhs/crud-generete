import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativeRoutingModule } from './administrative-routing.module';
import { AdministrativeComponent } from './administrative.component';
import { StudentListItemComponent } from './student-list-item/student-list-item.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { StudentEditModule } from './student-edit/student-edit.module';
import { NgbPaginationModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AdministrativeComponent, StudentListItemComponent],
  exports: [
    StudentListItemComponent,
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    AdministrativeRoutingModule,
    NgxSpinnerModule,
    StudentEditModule,
    NgxMaskModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModal.forRoot(),
  ],
  providers: [
    NgxSpinnerService,
    NgbPaginationConfig,
    // NgbModal,
    // NgbModalStack

  ]
})
export class AdministrativeModule { }
