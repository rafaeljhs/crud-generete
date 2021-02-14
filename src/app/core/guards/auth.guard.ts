import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRole } from '../models/auth.models';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private AuthService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.AuthService.currentUser();
        if (route.data.roles) {
            if (!route.data.roles.includes(currentUser.role)) {
                switch (currentUser.role) {
                    case UserRole.ISSUER:
                        this.router.navigate(['/administrative']);
                        break;
                    case UserRole.MASTER:
                        this.router.navigate(['/master/issuer/list']);
                        break;
                }
                return false;
            }
        }

        if (currentUser && currentUser.validTo > new Date()) {
            return true;
        }
        this.router.navigate(['/account/login']);
        return false;
    }
}