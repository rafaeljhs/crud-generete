import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public myPhotosRef: any;
  constructor(public http: HttpClient) { }

  convertImageUrlToBase64(imageUrl: string) {
    return new Promise((resolve, reject) => {
      this.convertImageUrlToFile(imageUrl).then(
        (image: any) => {
          const read = new FileReader();
          read.onload = () => {
            resolve(read.result);
          };
          read.onerror = () => {
            reject();
          };
          if (image) {
            read.readAsDataURL(image);
          } else {
            reject();
          }
        },
        (err) => reject(err)
      );
    });
  }

  convertImageUrlToFile(imageUrl: string) {
    return new Promise((resolve, reject) => {
      this.getBlobFromUrl(imageUrl).subscribe((blobImage) => {
        resolve(this.blobToFile(blobImage));
      }, reject);
    });
  }

  blobToFile = (theBlob: Blob, fileName: string = 'file_a'): File => {
    const b: any = theBlob;
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    // Cast to a File() type
    return theBlob as File;
  }

  getBlobFromUrl(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }

  qualidade(img, MAX_WIDTH, MAX_HEIGHT): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // MAX_WIDTH=MAX_HEIGHT;
        let quality = 100;
        let canvas: any = document.createElement('canvas');
        canvas.style.background = "#FFF !important";
        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;

        let image = new Image();
        image.onload = () => {
          let ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, MAX_WIDTH, MAX_HEIGHT);
          let dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        image.src = img;
      } catch (error) {
        resolve(img);
      }
    });
  }

  qualidade2(img, MAX_WIDTH, MAX_HEIGHT): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        let imageCanvas = await this.qualidadeCanvas(img);
        let canvas: any = document.createElement('canvas');
        canvas.style.setProperty('background', '#FFF');
        canvas.style.setProperty('backgroundColor', '#FFF');
        var width = imageCanvas.width;
        var height = imageCanvas.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        let image = new Image();
        image.onload = () => {
          let ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, MAX_WIDTH, MAX_HEIGHT);
          let dataUrl = canvas.toDataURL('image/png', 100);
          resolve(dataUrl);
        };
        image.src = img;
      } catch (error) {
        resolve(img);
      }
    });
  }

  qualidade100(img) {
    return new Promise((resolve, reject) => {
      try {
        if (img.indexOf('video/mp4') !== -1) {
          resolve(img);
        }
        let quality = 100;
        let canvas: any = document.createElement('canvas');
        canvas.style.background = "#FFF !important";
        let image = new Image();
        image.onload = () => {
          let width = image.width;
          let height = image.height;

          canvas.height = canvas.width = width > height ? height : width;
          let ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);
          let dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        image.src = img;
      } catch (error) {
        reject(img);
      }
    });

  }

  qualidadeCanvas(img): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let canvas: any = document.createElement('canvas');
        canvas.style.setProperty('background', '#FFF');
        let image = new Image();
        image.onload = () => {
          resolve(image);
        };
        image.src = img;
      } catch (error) {
        reject(img);
      }
    });

  }
  imageToDataUri(img, width, height) {
    // create an off-screen canvas
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    // return canvas.toDataURL();
    return canvas.toDataURL('image/jpeg', 100);
  }

  convertToDataURLviaCanvas(url) {
    let outputFormat = '';
    const exts = url.split('.').pop();
    if (exts === 'jpg' || exts === 'png' || exts === 'gif') {
      outputFormat = 'image/jpeg';
    } else {
      outputFormat = 'video/mp4';
    }
    return new Promise((resolve, reject) => {
      if (outputFormat == 'image/jpeg') {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        try {
          img.onload = () => {
            let canvas = document.createElement('CANVAS') as HTMLCanvasElement,
              ctx = canvas.getContext('2d'),
              dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            resolve(dataURL);
            canvas = null;
          };
          img.src = url;
        } catch (error) {
          reject(error);
        }
      } else {
        try {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = () => {
            let canvas = document.createElement('CANVAS') as HTMLCanvasElement,
              ctx = canvas.getContext('2d'),
              dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            resolve(dataURL);
            canvas = null;
          };
          img.src = url;
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  base64ToFile(dataurl) {
    let filename = this.createFileName();
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const imageData = (readerEvent.target as any).result;
        try {
          // this.qualidade(imageData, 1280, data => {
          resolve(imageData);
          // })
        } catch (error) {
          resolve(imageData);
        }
      };
      reader.readAsDataURL(file);
    });
  }
  processWebImage(event) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const imageData = (readerEvent.target as any).result;
        try {
          // this.qualidade(imageData, 1280, data => {
          resolve(imageData);
          // })
        } catch (error) {
          resolve(imageData);
        }
      };
      if (event.target.files.length > 0) {
        reader.readAsDataURL(event.target.files[0]);
      }
    });
  }

  createFileName() {
    let fileName = '';
    const date = new Date();
    const month = date.getMonth() + 1;
    fileName =
      date.getDate().toString() +
      month.toString() +
      date.getFullYear().toString() +
      date.getHours().toString() +
      date.getMinutes().toString() +
      date.getSeconds().toString() +
      date.getMilliseconds().toString();
    fileName += '.png';

    return fileName;
  }
}
