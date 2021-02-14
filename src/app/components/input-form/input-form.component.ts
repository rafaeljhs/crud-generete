import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

// import * as moment from 'moment';
// import flatpickr from "flatpickr";
declare var flatpickr;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFormComponent implements OnInit, AfterViewInit {
  @Input() id = `id${uuidv4().split('-').join('')}`;
  @Input() label: string;
  @Input() name: string;
  @Input() class: string;
  @Input() style: string;
  @Input() mask: string = null;
  @Input() ex: string;
  @Input() formGroup: FormGroup;
  @Input() submitted: boolean;
  @Input() disabled = false;
  @Input() placeholder: string;
  @Input() defaultBoColor = '#dfdfdf';
  @Input() color = '#00b19d';
  @Input() icon = '';

  @Input() type = 'text';
  @Input() rows = 1;

  @Input() multiple = false;
  @Input() tag = false;
  @Input() step: string = null;
  @Input() items: any[];
  @Input() selectLabel = 'name';
  @Input() selectId = 'id';
  @Input() notFoundText = 'Itens não encontrados';
  @Input() addTag: boolean | ((term: string) => any | Promise<any>);
  @Input() addTagText = 'Adicionar item';
  @Input() appendTo: string = null;

  @Input() dateFormat = 'd/m/Y';
  @Input() altFormat = 'd/m/Y';

  @Input() minDate: string = null;
  @Input() maxDate: string = null;
  componentcolor = '#ffffff';

  required = false;

  @Output() onfocusout = new EventEmitter();
  @Output() change = new EventEmitter();
  @Output() keyup = new EventEmitter();
  @Output() clear = new EventEmitter();

  currentDate = moment().format('YYYY-MM-DD');

  addCustomUser = term => {
    let aux = {};
    if (this.tag) {
      aux[this.selectId] = term;
      aux[this.selectLabel] = term;
    }
    return this.tag ? aux : null;
  };
  // html

  // public currentDate = moment().format("YYYY-MM-DD");

  constructor() {
    //
  }
  colorChange() {
    this.f.setValue(this.componentcolor);
  }
  // addTagFn(name) {
  //   return { name, tag: true };
  // }
  // addCustomUser = term => {
  //   const aux = {};
  //   if (this.tag) {
  //     aux[this.selectId] = term;
  //     aux[this.selectLabel] = term;
  //   }
  //   return this.tag ? aux : null;
  // }
  get f() {
    return this.formGroup.controls[this.name];
  }
  ngOnInit() {
    if (this.type === 'daterange') {
      setTimeout(() => {
        flatpickr('#' + this.name, {
          mode: 'range',
          minDate: this.minDate,
          maxDate: this.maxDate,
          altInput: true,
          altFormat: this.altFormat,
          locale: 'pt',
          dateFormat: this.dateFormat
        });
      }, 200);
    }
    if (this.type === 'date') {
      setTimeout(() => {
        flatpickr('#' + this.name, {
          locale: 'pt',
          altInput: true,
          minDate: this.minDate,
          maxDate: this.maxDate,
          altFormat: this.altFormat,
          dateFormat: this.dateFormat
        });
      }, 200);
    }

    if (this.type === 'datetime') {
      setTimeout(() => {
        flatpickr('#' + this.name, {
          mode: 'time',
          enableTime: true,
          locale: 'pt',
          altInput: true,
          minDate: this.minDate,
          maxDate: this.maxDate,
          altFormat: 'H:i',
          dateFormat: 'H:i'
        });
      }, 200);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.required = this.f && this.f.errors && this.f.errors.required === true;
      // if (this.f.value) {
      //   this.componentcolor = this.f.value;
      // }
    }, 500);

    if (this.type === 'select') {
      const select = document.getElementsByClassName('ng-select-container') as HTMLCollection;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < select.length; i++) {
        select[i].setAttribute('style', 'border-radius: 30px; background: #EBEBEB;');
      }
      const drop = document.getElementsByClassName('ng-arrow-wrapper') as HTMLCollection;
      for (let j = 0; j < select.length; j++) {
        drop[j].setAttribute(
          'style',
          'background: #351186; border-radius: 50%; height: 22px; width: 22px; margin-right: 6px; padding: 0;'
        );
      }
      const arrow = document.getElementsByClassName('ng-arrow') as HTMLCollection;
      for (let k = 0; k < select.length; k++) {
        arrow[k].setAttribute('style', 'border-color: #fff transparent transparent; top: 1px;');
      }
    }

    const item = document.getElementById(this.name) as HTMLInputElement;
    const thit = this;

    if (this.step) {
      item.setAttribute('step', this.step);
    }
    if (this.disabled) {
      if (this.type === 'select') {
        this.type = 'text';
        const texts = (document.getElementById(this.name) as any).childNodes[0].childNodes[0].innerText + '';

        setTimeout(() => {
          const input = document.getElementById(this.name) as HTMLInputElement;
          input.setAttribute('disabled', 'true');
          input.value = texts;
        }, 500);
      } else {
        item.setAttribute('disabled', 'true');
      }
    }

    if (this.change && item) {
      // tslint:disable-next-line: only-arrow-functions
      item.addEventListener('change', function () {
        thit.emit('change');
      });
    }
    if (this.onfocusout && item) {
      // tslint:disable-next-line: only-arrow-functions
      item.addEventListener('focusout', function () {
        thit.emit('onfocusout');
      });
    }

    if (this.keyup && item) {
      // tslint:disable-next-line: only-arrow-functions
      item.addEventListener('keyup', function () {
        thit.keyup.emit(item);
      });
    }
  }

  emit(item) {
    if (this[item]) {
      this[item].emit();
    }
  }
}
