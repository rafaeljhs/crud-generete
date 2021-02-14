import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;
  submitting = false;
  error='';


  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      object: [, Validators.required],
     
    });
  }

  async onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.submitting = true;
    // Object.assign(this.data, this.formGroup.value);

    try {
     
    } catch (e) {
      this.submitted = false;
      this.submitting = false;
      this.error = 'Verifique os dados e tente novamente.';
    }
  }

}
