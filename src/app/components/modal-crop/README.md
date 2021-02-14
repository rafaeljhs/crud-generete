versão do puglin
"ngx-image-cropper": "^3.1.8",


uso

async openCrop(file: File) {
    try {
      const base64 = await this._image.fileToBase64(file);
      const modalRef = this.modalService.open(ModalCropComponent, { centered: true, windowClass: 'modal-full' });
      modalRef.componentInstance.aspectRatio = 16 / 9;
      modalRef.componentInstance.imageBase64 = base64;

      const baseUrl = await modalRef.result;
      this.imageBaseUrl = baseUrl;
    } catch (error) {
      await Swal.fire('Erro!', 'Não foi possível converter a imagem selecionada', 'error');
    }
  }


  html padrão
