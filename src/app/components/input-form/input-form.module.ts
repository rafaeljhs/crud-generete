import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxMaskModule } from 'ngx-mask';
import { UiSwitchModule } from 'ngx-ui-switch';
import { InputFormComponent } from './input-form.component';

@NgModule({
  imports: [
    CommonModule,
    // ImageCropperModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    UiSwitchModule,
    ColorPickerModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [InputFormComponent],
  exports: [InputFormComponent]
})
export class InputFormModule { }
