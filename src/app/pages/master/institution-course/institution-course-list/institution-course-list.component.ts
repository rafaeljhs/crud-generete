import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/core/models/course.models';
import { EventService } from 'src/app/core/services/event.service';
import { Institution } from 'src/app/core/models/institution.models';
import { CourseService } from 'src/app/core/services/course.service';
import { InstitutionService } from 'src/app/core/services/institution.service';
import { InstitutionCourse } from 'src/app/core/models/institution-course.models';
import { InstitutionCourseService } from './../../../../core/services/institution-course.service';
import { InstitutionCourseManagerComponent } from '../institution-course-manager/institution-course-manager.component';
@Component({
  selector: 'app-institution-course-list',
  templateUrl: './institution-course-list.component.html',
  styleUrls: ['./institution-course-list.component.scss']
})
export class InstitutionCourseListComponent implements OnInit {

  page = 1;
  typingTimer;
  pageSize = 30;
  loading = true;
  allPeriods = [];
  searchModel: any;
  totalRecords = 0;
  allEduLevels = [];
  allCourse: Course[];
  institution: Institution;
  items: Institution[] = [];
  list: InstitutionCourse[] = [];
  constructor(
    private _event: EventService,
    private modalService: NgbModal,
    private _course: CourseService,
    private _spinner: NgxSpinnerService,
    private _data: InstitutionCourseService,
    private _institution: InstitutionService,
  ) { }

  ngOnInit() {
    this.getAllInstitution();
    this._institution.getAll(1, 100).then(res => {
      this.items = res.list;
    })
    this._course.getAll().then(res => {
      this.allCourse = res;
    })
    this._data.collecs().then(res => {
      if (res.AllEduLevels) {
        this.allEduLevels = res.AllEduLevels.map(x => {
          return {
            id: x.Id,
            title: x.Title,
          }
        })
      }
      if (res.AllPeriods) {
        this.allPeriods = res.AllPeriods.map(x => {
          return {
            id: x.Id,
            title: x.Title,
          }
        })
      }
      // this.edit(this.list[0])
    })
    this._event.subscribe('institution-course-list', (item) => {
      this.institution = item;
      this.getAllInstitution();
    });

  }
  closeItem() {
    this.institution = null;
    this.getAllInstitution();
  }
  //função para buscar apos o usuario para de digitar
  search() {
    clearTimeout(this.typingTimer);
    var aux = this;
    this.typingTimer = setTimeout(function () {
      aux.page = 1;
      aux.pageSize = 10;
      aux.totalRecords = 0;
      aux.getAllInstitution();
    }, 1500, this);
  }
  getAllInstitution() {
    this._spinner.show();
    this.loading = false;
    try {
      this._data.getAll(this.page, this.pageSize, this.searchModel, this.institution ? this.institution.id : null).then(res => {
        if (res) {
          this.totalRecords = res.total;
          this.list = res.list;
        }
        this.loading = false;

        this._spinner.hide();
      })
    } catch (error) {
      this.loading = false;
      this._spinner.hide();
      Swal.fire('Erro!', 'Algo de inesperado aconteceu', 'error');
    }
  }


  changeIndex(index) {
    this.page = index;
    this.getAllInstitution();
  }

  edit(item = new InstitutionCourse()) {
    try {
      const modalRef = this.modalService.open(InstitutionCourseManagerComponent,
        {
          size: 'lg',
          centered: true,
        });
      modalRef.componentInstance.dataId = item.id;
      modalRef.componentInstance.items = this.items;
      modalRef.componentInstance.modal = modalRef;
      modalRef.componentInstance.allEduLevels = this.allEduLevels;
      modalRef.componentInstance.allPeriods = this.allPeriods;
      modalRef.componentInstance.allCourse = this.allCourse;
      modalRef.componentInstance.institution = this.institution;


      modalRef.result.then(res => {
        if (res == 'load') {
          this.getAllInstitution();
        }
      })
    } catch (e) {
      Swal.fire('Erro!', 'Não foi possível editar o estudante', 'error');
    }
  }

}
