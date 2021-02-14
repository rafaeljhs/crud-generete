import { IssuerService } from './../../../../core/services/issuer.service';
import { Issuer } from './../../../../core/models/issuer.models';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCropComponent } from 'src/app/components/modal-crop/modal-crop.component';
import { ImageService } from 'src/app/core/services/image.service';
import { Location } from '@angular/common';
import { FileService } from 'src/app/core/services/file.service';
import { GenericValidator } from 'src/app/components/input-form/generic-validator';

@Component({
  selector: 'app-issuer-manager',
  templateUrl: './issuer-manager.component.html',
  styleUrls: ['./issuer-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IssuerManagerComponent implements OnInit {

  fileUploadControl = new FileUploadControl(FileUploadValidators.filesLimit(0));
  imageBaseUrl = '';
  imageChange = false;
  formGroup: FormGroup;
  submitted = false;
  submitting = false;
  error = '';
  loading = false;
  data = new Issuer();
  readOnly = false;
  searching = false;
  constructor(
    private _issuer: IssuerService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _image: ImageService,
    private modalService: NgbModal,
    private location: Location,
    private _file: FileService,


    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.formGroup = this.formBuilder.group({
      CompanyName: [null, [Validators.required]],
      TradeName: [null, [Validators.required]],
      CNPJ: [null, [GenericValidator.CNPJ, Validators.required]],
      Email: [null, [GenericValidator.EMAIL, Validators.required]],
      Phone: [null, [Validators.required]],
      Address: [null, [Validators.required]],
      Neighborhood: [null, [Validators.required]],
      CEP: [null, [Validators.required]],
      City: [null, [Validators.required]],
      StateUF: [null, [Validators.required]],
      CardPrice: [null, [Validators.required]],
      DeactivationDate: [null, [Validators.required]],
      Login: [null, [Validators.required]],
      Password: [null, [Validators.required]],
      BankName: [null],
      BankAccount: [null],
      BankBranch: [null],
      BankAccountHolder: [null],
      BankMovement: [null],
    });
    this.loading = true;

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      try {
        // this.data = await this._issuer.getById(id);
        this.data = await this._issuer.getById(id);
        this.formGroup.patchValue(this.data);
        this.f.DeactivationDate.setValue(this.data.DeactivationDate.toISOString().substr(0, 10))

        if (this.data.Files && this.data.Files.length) {
          this.imageBaseUrl = this.data.Files[0].URL;
          this.fileUploadControl.addFile(new File([], this.data.Files[0].Code + ".png"))
        }
      } catch (e) {
        Swal.fire('Erro!', 'Não foi possível carregar os dados!', 'error');
        this.location.back();
      }
    }



    this.fileUploadControl.valueChanges.subscribe((files: File[]) => {
      if (files.length > 1) {
        setTimeout(() => {
          this.fileUploadControl.removeFile(files[0]);
        });
      } else if (files.length === 1 && files[0].size) {
        this.openCrop(files[0]);
      } else if (files.length === 0) {
        this.imageBaseUrl = null;
      }
    });

    this.loading = false;
  }

  get f() {
    return this.formGroup.controls;
  }

  async openCrop(file: File) {
    try {
      const base64 = await this._image.fileToBase64(file);
      const modalRef = this.modalService.open(ModalCropComponent, { centered: true, windowClass: 'modal-full' });
      modalRef.componentInstance.aspectRatio = 16 / 9;
      modalRef.componentInstance.imageBase64 = base64;
      const baseUrl = await modalRef.result;
      if (baseUrl) {
        this.imageBaseUrl = baseUrl;
      } else {
        this.fileUploadControl.removeFile(file);
      }
      this.imageChange = true;
    } catch (error) {
      await Swal.fire('Erro!', 'Não foi possível converter a imagem selecionada', 'error');
    }
  }
  async getCEP() {
    this.searching = true;
    try {
      if (this.f.cep.value.length === 8) {
        await this.http.get(`https://viacep.com.br/ws/${this.f.cep.value}/json/`).toPromise().then(res => {
          if (res) {
            this.f.address.setValue(res['logradouro']);
            this.f.neighborhood.setValue(res['bairro']);
            this.f.city.setValue(res['localidade']);
            this.f.stateUF.setValue(res['uf']);
          }
        })
      }
    } catch (e) {
    }
    this.searching = false;
  }
  async onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }
    this.submitting = true;
    this.error = '';

    Object.assign(this.data, this.formGroup.value);

    try {
      var image: File = null;
      if (this.imageChange) {
        image = await this._image.base64ToFile(this.imageBaseUrl)
      }
      if (this.data.Id) {
        if (image) {
          await this._file.add(image, this.data.Id)
        }
        await this._issuer.update(this.data);
      } else {
        await this._issuer.create(this.data, image);
      }
      await Swal.fire('Sucesso!', 'Dados salvos com sucesso !', 'success');
      this.location.back();

    } catch (error) {
      debugger
      this.error = error;
      this.submitting = false;
    }
  }

  deleteItem() {
    Swal.fire({
      title: `CONFIRMAR EXLUSÃO DE REGISTRO`,
      text: 'Deseja realmente exluir o registro? Lembre-se, essa ação é irreversível!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: `Excluir`,
      confirmButtonColor: '#B31500',
      cancelButtonText: 'Voltar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this._issuer.delete(this.data.Id).then(() => true).catch(() => {
          Swal.showValidationMessage(`Não foi possível excluir, tente novamente.`);
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Swal.fire("Sucesso!", `Emissora deletada com Sucesso!.`, 'success');
        this.location.back();
      }
    });
  }
}
