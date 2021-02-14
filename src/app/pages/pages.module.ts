import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { PagesRoutingModule } from './pages-routing.module';
import { MasterRoutingModule } from './master/master-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // NgbDropdownModule,
    // DashboardsModule,
    // AppsModule,
    // EmailModule,
    // ExtrasModule,
    // UiModule,
    // IconsModule,
    // FormModule,
    // ChartModule,
    // MapsModule,
    // TablesModule,
    // EcommerceModule,
    // CRMModule,
    // AdminUIModule,
    // ErrorModule,
    MasterRoutingModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
