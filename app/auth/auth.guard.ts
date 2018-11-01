import { Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route, state: RouterStateSnapshot) {
        return this.authService.user$.map(user => {
            if (user) return true;

            this.router.navigate(['/'],
            {queryParams: {returnUrl: state.url }});
            return false;
        });
        }
    }


