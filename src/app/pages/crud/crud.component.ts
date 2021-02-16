import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GeneralAttributes } from 'src/app/core/models/general-attributes';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Crud } from 'src/app/core/models/crud';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  listAll: GeneralAttributes[] = [];
  listList: GeneralAttributes[] = [];
  listCreate: GeneralAttributes[] = [];
  formGroup: FormGroup;
  submitted = false;
  submitting = false;
  error = '';
  crud = new Crud();

  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      object: [, Validators.required],
      nameClass: ['PaymentMethod', Validators.required],
      nameList: ['payment-method-list', Validators.required],
      nameCreate: ['payment-method-create', Validators.required],
      folder: ['payment-method', Validators.required],
    });
    this.f.object.setValue(`{
      token : '',
      final : '',
      referenceLink : '',
      customerId : '',
      userId : '',
      cpf : '',
      email : ''
    }`)
    this.onSubmit();
  }
  get f() {
    return this.formGroup.controls;
  }
  getNames() {
    this.f.nameList.setValue(this.f.folder.value + '-list');
    this.f.nameCreate.setValue(this.f.folder.value + '-create');
  }

  reorderList(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }

  async onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.submitting = true;
    try {
      Object.assign(this.crud, this.formGroup.value);
      let object = this.f.object.value;
      const searchRegExp = /;/gi;
      const replaceWith = '';
      object = object.replace(searchRegExp, replaceWith);
      let obj = eval('(' + object + ')')
      Object.keys(obj).forEach(element => {
        let aux = new GeneralAttributes();
        aux.name = element;
        aux.type = typeof (obj[element]);
        this.listAll.push(aux);
        this.listCreate.push(aux);
        this.listList.push(aux);
      });
      console.log(this.listAll);
      
      
      this.submitted = false;
      this.submitting = false;
    } catch (e) {
      this.submitted = false;
      this.submitting = false;
      this.error = 'Verifique os dados e tente novamente.';
    }
  }

}
