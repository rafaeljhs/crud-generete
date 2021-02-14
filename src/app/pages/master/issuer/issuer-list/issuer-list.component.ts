import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Issuer } from 'src/app/core/models/issuer.models';
import { IssuerService } from 'src/app/core/services/issuer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issuer-list',
  templateUrl: './issuer-list.component.html',
  styleUrls: ['./issuer-list.component.scss']
})
export class IssuerListComponent implements OnInit {

  loading = true;
  searchModel: any;
  page = 1;
  pageSize = 30;
  totalRecords = 0;
  list: Issuer[] = [];
  typingTimer;

  constructor(
    private _spinner: NgxSpinnerService,
    private _data: IssuerService) { }

  ngOnInit() {
    this.getAllStudent();
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
  getAllStudent() {
    this._spinner.show();
    this.loading = false;
    try {
      this._data.getAll(this.page, this.pageSize, this.searchModel).then(res => {
        if (res) {
          this.totalRecords = res.total;
          this.list = res.list;
        }
        // this.edit(this.allStudent[0])
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
