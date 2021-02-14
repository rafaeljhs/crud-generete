import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private AuthService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.AuthService.logout();
                location.reload();
            }
            if (err && err.error && err.error.errors) {
                let aux = "";
                Object.keys(err.error.errors).forEach(res => {
                    aux += (err.error.errors[res][0]) + "-"
                })
                return throwError(aux);
            }
            if (!err.error && err.status == 404) {
                return throwError('Api não encontrada!');
            }
            const error = err.error && err.error.Message || err.Message;
            return throwError(error);
        }));
    }
}
