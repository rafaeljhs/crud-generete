import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFormModule } from 'src/app/components/input-form/input-form.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { UIModule } from 'src/app/components/ui/ui.module';
import { CrudRoutingModule } from './crud-routing.module';
import { DndListModule } from 'ngx-drag-and-drop-lists';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    InputFormModule,
    CrudRoutingModule,
    UIModule,
    DndListModule
  ],
  declarations: [CrudComponent]
})
export class CrudModule { }
