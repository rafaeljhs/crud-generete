import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GeneralAttributes } from 'src/app/core/models/general-attributes';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  listGeneral: GeneralAttributes[] = [];
  formGroup: FormGroup;
  submitted = false;
  submitting = false;
  error = '';
  name: string;

  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      object: [, Validators.required],
      name: ['payment-method', Validators.required],

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
  reorderList(item: any, list: any[]): void {
    debugger
    list.splice(list.indexOf(item), 1);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listGeneral, event.previousIndex, event.currentIndex);
  }
  removeItem(index) {
    this.listGeneral.slice(index, 1)
    debugger
  }
  async onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.submitting = true;

    try {
      let object = this.f.object.value;
      const searchRegExp = /;/gi;
      const replaceWith = '';
      object = object.replace(searchRegExp, replaceWith);
      let obj = eval('(' + object + ')')
      Object.keys(obj).forEach(element => {
        let aux = new GeneralAttributes();
        aux.name = element;
        aux.type = typeof (obj[element]);
        this.listGeneral.push(aux);
      });
      this.name = this.f.name.value;
      // Object.assign(this.data, this.formGroup.value);
      this.submitted = false;
      this.submitting = false;
    } catch (e) {
      this.submitted = false;
      this.submitting = false;
      this.error = 'Verifique os dados e tente novamente.';
    }
  }

}
