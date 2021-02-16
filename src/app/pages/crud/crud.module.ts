import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFormModule } from 'src/app/components/input-form/input-form.module';
import { NgbAlertModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { UIModule } from 'src/app/components/ui/ui.module';
import { CrudRoutingModule } from './crud-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CrudListComponent } from './crud-list/crud-list.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    InputFormModule,
    CrudRoutingModule,
    UIModule,
    NgbTabsetModule,
    DragDropModule
  ],
  declarations: [CrudComponent, CrudListComponent]
})
export class CrudModule { }
