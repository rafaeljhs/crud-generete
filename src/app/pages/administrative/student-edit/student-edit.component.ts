import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from './../../../core/models/student.models';
import { StudentService } from './../../../core/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {


  data: Student;
  error = '';
  formGroup: FormGroup;
  loading = true;
  searching = false;
  submitted = false;
  submitting = false;


  constructor(
    private fb: FormBuilder,
    private _student: StudentService,
    private http: HttpClient,
    private modalService: NgbModal

  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [, Validators.required],
      birthDate: [, [Validators.required]],
      rg: [],
      cpf: [],
      currentTerm: [],
      periodId: [],
      cardCode: [],
      cep: [],
      address: [],
      neighborhood: [],
      city: [],
      stateUF: [],
      phone: [],
    });
    if (this.data) {
      this.formGroup.patchValue(this.data);
      this.f.birthDate.setValue(this.data.birthDate.toISOString().substr(0,10))
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
      this.data.birthDate = new Date(this.data.birthDate);
      await this._student.update(this.data);
      await Swal.fire('Sucesso!', 'O estudante foi editado!', 'success');
      this.modalService.dismissAll();
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

}
