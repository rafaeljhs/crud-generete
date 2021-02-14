import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CookieService } from '../services/cookie.service';
import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user: User;

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('currentUser'));
            if (this.user && this.user.validTo) {
                this.user.validTo = new Date(this.user.validTo);
            }
        }
        return this.user;
    }

    login(login: string, password: string) {
        return this.http.post<any>(`${environment.url}auth/login`, { login, password }).toPromise().then(user => {
            if (user && user.StatusCode == 200) {
                this.user = {
                    userImage: user.Value.UserInfo,
                    validTo: new Date(user.Value.ValidTo),
                    token: user.Value.Token,
                    role: user.Value.Role
                }
                // store user details and jwt in cookie
                this.cookieService.setCookie('currentUser', JSON.stringify(this.user), 1);
                return user;
            }
            Promise.reject(user.Message);
        })
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser');
        this.user = null;
    }
}

