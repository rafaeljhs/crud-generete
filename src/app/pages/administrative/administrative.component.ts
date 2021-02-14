import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../core/services/auth.service';
import { StudentService } from './../../core/services/student.service';
import { Component, OnInit } from '@angular/core';
import { Student, StudentStatus } from 'src/app/core/models/student.models';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/core/models/auth.models';
import { Router } from '@angular/router';
import { StudentEditComponent } from './student-edit/student-edit.component';

@Component({
  selector: 'app-administrative',
  templateUrl: './administrative.component.html',
  styleUrls: ['./administrative.component.scss']
})
export class AdministrativeComponent implements OnInit {

  searchModel: string;
  type = 'all';
  loading = true;

  page = 1;
  pageSize = 10;
  totalRecords = 0;
  allStudent: Student[] = [];

  currentUser: User;
  studentStatus = StudentStatus;
   typingTimer;

  constructor(
    private _student: StudentService,
    private _spinner: NgxSpinnerService,
    private _auth: AuthService,
    private router: Router,
    private modalService: NgbModal

  ) { }

  ngOnInit() {
    this.currentUser = this._auth.user;
    this.getAllStudent();
  }

  edit(item) {
    try {
      const modalRef = this.modalService.open(StudentEditComponent, { centered: true, windowClass: 'modal-full' });
      modalRef.componentInstance.data = item;
    } catch (e) {
      Swal.fire('Erro!', 'Não foi possível editar o estudante', 'error');
    }
  }
  search() //função para buscar apos o usuario para de digitar
  {
    clearTimeout(this.typingTimer);
    var aux = this;
    this.typingTimer = setTimeout(function () {
      aux.page = 1;
      aux.pageSize = 10;
      aux.totalRecords = 0;
      aux.getAllStudent();
    }, 1500, this);
  }

  logout() {
    this._auth.logout();
    this.router.navigate(['/account/login']);
  }

  select(type) {
    this.type = type;
    this.page = 1;
    this.pageSize = 10;
    this.totalRecords = 0;
    this.getAllStudent();
  }
  getAllStudent() {
    this._spinner.show();
    this.loading = false;
    try {
      this._student.getAll(this.page, this.pageSize, this.studentStatus[this.type], this.searchModel).then(res => {
        if (res) {
          this.totalRecords = res.total;
          this.allStudent = res.list;
        }
        this.edit(this.allStudent[0])
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
    this.getAllStudent();
  }

}
