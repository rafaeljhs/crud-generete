import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Institution } from 'src/app/core/models/institution.models';
import { InstitutionService } from 'src/app/core/services/institution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-institution-manager',
  templateUrl: './institution-manager.component.html',
  styleUrls: ['./institution-manager.component.scss']
})
export class InstitutionManagerComponent implements OnInit {

  data: Institution;
  error = '';
  formGroup: FormGroup;
  loading = true;
  modal: NgbModalRef;
  searching = false;
  submitted = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private _institution: InstitutionService,
    private http: HttpClient,
    private modalService: NgbModal

  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [, Validators.required],
      location: [, Validators.required],

    });
    if (this.data) {
      this.formGroup.patchValue(this.data);
    }
  }
  close() {
    this.modalService.dismissAll();
  }
  async onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.submitting = true;
    Object.assign(this.data, this.formGroup.value);

    try {
      // this.data.birthDate = new Date(this.data.birthDate);
      if (this.data.id) {
        await this._institution.update(this.data);
        await Swal.fire('Sucesso!', 'O estudante foi editado!', 'success');
      } else {
        await this._institution.add(this.data);
        await Swal.fire('Sucesso!', 'O estudante foi criado!', 'success');

      }
      this.modal.close('load');
      // this._router.navigate(['/entity']);
    } catch (e) {
      this.submitted = false;
      this.submitting = false;
      this.error = 'Verifique os dados e tente novamente.';
    }
  }


  get f() {
    return this.formGroup.controls;
  }

  deleteItem() {
    Swal.fire({
      title: `CONFIRMAR EXLUSÃO DE REGISTRO`,
      text: 'Deseja realmente exluir o registro? Lembre-se, essa ação é irreversível!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: `Excluir`,
      confirmButtonColor:'#B31500',
      cancelButtonText: 'Voltar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this._institution.delete(this.data.id).then(() => true).catch(() => {
          Swal.showValidationMessage(`Não foi possível excluir, tente novamente.`);
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Swal.fire("Sucesso!", `Instituição deletada com Sucesso!.`, 'success');
        this.modal.close('load');
      }
    });
  }

  

}
