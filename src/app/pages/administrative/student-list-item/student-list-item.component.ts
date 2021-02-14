import { StudentService } from './../../../core/services/student.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student, StudentStatus } from 'src/app/core/models/student.models';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-student-list-item',
  templateUrl: './student-list-item.component.html',
  styleUrls: ['./student-list-item.component.scss']
})
export class StudentListItemComponent implements OnInit {

  @Input() item: Student;
  studentStatus = StudentStatus;
  showButtons = false;
  loadApproved = false;
  loadRejected = false;
  showMensagem = false;
  closeResult = '';
  @Output() edit = new EventEmitter();

  constructor(
    private _student: StudentService,
    public formBuilder: FormBuilder,
    // private modalService: NgbModal

  ) { }

  ngOnInit(): void {

  }

  async aprroved() {
    try {
      this.loadApproved = true;
      let res = await this._student.postStatus(this.item.id, StudentStatus.Approved, '');
      Swal.fire('Sucesso!', res['Message'], 'success');
      this.item.status = StudentStatus.Approved;
      this.loadApproved = false;
    } catch (error) {
      Swal.fire('Erro!', 'Algo de inesperado aconteceu', 'error');
      console.log('error', error);
      this.loadApproved = false;
    }

  }

editItem(){
  this.edit.emit(this.item)
}
  async rejected() {
    try {
      this.loadApproved = true;
      const { value: text } = await Swal.fire({
        input: 'textarea',
        title: "Qual o motivo de cancelamento?",
        // inputLabel: 'Message',
        inputPlaceholder: 'Digite o motivo aqui!',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      let res = await this._student.postStatus(this.item.id, StudentStatus.Rejected, text);
      Swal.fire('Sucesso!', res['Message'], 'success');
      this.item.status = StudentStatus.Rejected;
      this.loadApproved = false;
    } catch (error) {
      Swal.fire('Erro!', 'Algo de inesperado aconteceu', 'error');
      console.log('error', error);
      this.loadApproved = false;

    }

  }

}
