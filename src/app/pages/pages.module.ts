import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { PagesRoutingModule } from './pages-routing.module';
import { DndListModule } from 'ngx-drag-and-drop-lists';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    DndListModule
  ]
})
export class PagesModule { }
