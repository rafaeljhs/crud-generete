import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Institution } from 'src/app/core/models/institution.models';
import { EventService } from 'src/app/core/services/event.service';
import { InstitutionService } from 'src/app/core/services/institution.service';
import Swal from 'sweetalert2';
import { InstitutionManagerComponent } from '../institution-manager/institution-manager.component';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent implements OnInit {

  loading = true;
  searchModel: any;
  page = 1;
  pageSize = 30;
  totalRecords = 0;
  list: Institution[] = [];
  typingTimer;
  constructor(
    private _spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _event: EventService,
    private _data: InstitutionService) { }

  ngOnInit() {
    this.getAllInstitution();
  }

  search() //função para buscar apos o usuario para de digitar
  {
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
      this._data.getAll(this.page, this.pageSize, this.searchModel).then(res => {
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
  showCurse(item: Institution) {
    this._event.publish('institution-course-list',item)
  }

  changeIndex(index) {
    this.page = index;
    this.getAllInstitution();
  }

  edit(item = new Institution()) {
    try {
      const modalRef = this.modalService.open(InstitutionManagerComponent,
        {
          size: 'md',
          centered: true,
        });
      modalRef.componentInstance.data = item;
      modalRef.componentInstance.modal = modalRef;
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
