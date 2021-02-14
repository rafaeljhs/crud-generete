import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentEditComponent } from './student-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { InputFormModule } from 'src/app/components/input-form/input-form.module';


@NgModule({
  declarations: [StudentEditComponent],
  exports: [StudentEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputFormModule,
    NgbAlertModule,

  ]
})
export class StudentEditModule { }
