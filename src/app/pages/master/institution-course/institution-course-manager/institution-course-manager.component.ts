import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionCourse } from 'src/app/core/models/institution-course.models';
import { Institution } from 'src/app/core/models/institution.models';
import { InstitutionCourseService } from 'src/app/core/services/institution-course.service';
import { InstitutionService } from 'src/app/core/services/institution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-institution-course-manager',
  templateUrl: './institution-course-manager.component.html',
  styleUrls: ['./institution-course-manager.component.scss']
})
export class InstitutionCourseManagerComponent implements OnInit {

  modal: NgbModalRef;
  dataId: string;
  data = new InstitutionCourse();
  institution: Institution;

  formGroup: FormGroup;
  loading = true;
  submitted = false;
  submitting = false;
  error = '';
  searching = false;

  items: Institution[] = [];
  allPeriods = [];
  allEduLevels = [];
  allCourse = [];

  constructor(
    private fb: FormBuilder,
    private _institutionCourse: InstitutionCourseService,
    private modalService: NgbModal

  ) { }

  async ngOnInit() {
    this.formGroup = this.fb.group({
      courseName: [, Validators.required],
      institutionId: [, Validators.required],
      qtyTerms: [, Validators.required],
      eduLevelId: [, Validators.required],
    });
    try {
      if (this.dataId) {
        this.data = await this._institutionCourse.getById(this.dataId)
        this.formGroup.patchValue(this.data);
      } else if (this.institution) {
        this.f.institutionId.setValue(this.institution.id)
      }
      if (this.allPeriods) {
        for (let index = 0; index < this.allPeriods.length; index++) {
          const element = this.allPeriods[index];
          this.formGroup.addControl('periods' + element.id, new FormControl(this.data && this.data.periodIds ? this.data.periodIds.find(x => x == element.id) : false))
        }
      }
    } catch (error) {
      this.loading = false;
      this.error = 'Algo de inesperado aconteceu: ' + error;
    }

    this.loading = false;
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
    let aux = { ...this.data }
    Object.assign(aux, this.formGroup.value);
    debugger
    try {
      if (this.dataId) {

        let institutionCourse = new InstitutionCourse();
        institutionCourse.id = this.dataId;
        institutionCourse.qtyTerms = aux.qtyTerms;
        institutionCourse.eduLevelId = aux.eduLevelId;
        institutionCourse.periodIds = [];
        this.allPeriods.forEach(element => {
          if (aux['periods' + element.id]) {
            institutionCourse.periodIds.push(element.id);
          }
        });

        await this._institutionCourse.update(institutionCourse);
        await Swal.fire('Sucesso!', 'O curso foi editado !', 'success');
      } else {
        let institutionCourse = new InstitutionCourse();
        institutionCourse.courseName = aux.courseName;
        institutionCourse.institutionId = aux.institutionId;
        institutionCourse.qtyTerms = aux.qtyTerms;
        institutionCourse.eduLevelId = aux.eduLevelId;
        institutionCourse.periodIds = [];
        this.allPeriods.forEach(element => {
          if (aux['periods' + element.id]) {
            institutionCourse.periodIds.push(element.id);
          }
        });
        await this._institutionCourse.create(institutionCourse);
        await Swal.fire('Sucesso!', 'O curso foi criado !', 'success');

      }

      this.modal.close('load');
      // this._router.navigate(['/entity']);
    } catch (error) {
      this.submitted = false;
      this.submitting = false;
      this.error = 'Algo de inesperado aconteceu: ' + error;
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
      confirmButtonColor: '#B31500',
      cancelButtonText: 'Voltar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this._institutionCourse.delete(this.data.id).then(() => true).catch(() => {
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
