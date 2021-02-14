import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalCropComponent } from './modal-crop.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [CommonModule, ImageCropperModule],
  declarations: [ModalCropComponent],
  exports: [ModalCropComponent]
})
export class ModalCropModule { }
