import { UserRole } from './../../../../core/models/auth.models';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  submitting = true;
  // returnUrl: string;
  error = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['MASTER', [Validators.required]],
      password: ['e10adc3949ba59abbe56e057f20f883e', Validators.required],
    });

    this._auth.logout();
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/administrative';
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * On submit form
   */
  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    try {
      this.loading = true;
      await this._auth.login(this.f.email.value, this.f.password.value).then(() => {
        switch (this._auth.currentUser().role) {
          case UserRole.ISSUER:
            this.router.navigate(['/administrative']);
            break;
          case UserRole.MASTER:
            this.router.navigate(['/master']);
            break;
        }
      })

    } catch (error) {
      if (error == 'Bad Request') {
        this.error = "Dados de Login inválidos!"
      } else if (error == 'Unknown Error') {
        this.error = "Servidor não encontrado!"
      } else {
        this.error = 'Algo de inesperado aconteceu!';
      }
      console.log('error', error);
      this.loading = false;
    }

  }
}
