import { ImageCropperComponent, ImageTransform, ImageCroppedEvent } from 'ngx-image-cropper';
import { Component, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-crop',
  templateUrl: './modal-crop.component.html',
  styleUrls: ['./modal-crop.component.scss']
})
export class ModalCropComponent {
  @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent;
  @Input() imageBase64: string;
  @Input() aspectRatio: number = 16 / 9;


  imageChangedEvent: any = '';
  croppedImage: any = '';

  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = true;
  transform: ImageTransform = {};


  constructor(
    private _ngbModal: NgbActiveModal,
    private route: ActivatedRoute,
  ) { }
  /**
   * Crop image
   * @param event image passed
   */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  setAspectRatio(num: number) {
    this.aspectRatio = num;
  }


  rotateLeft() {
    this.canvasRotation++;
    this.flipAfterRotate();
    // this.imageCropper.imagetr();
  }
  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }
  zoom(z) {
    this.scale += z;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }



  dismiss() {
    this._ngbModal.close();
  }

  close() {
    this._ngbModal.close(this.croppedImage);
  }
}
