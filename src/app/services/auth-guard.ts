import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private Authguardservice: AuthService, private authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.Authguardservice.gettoken()) {
            this.authService.user.next({});
            this.router.navigateByUrl("/login");
        }
        return this.Authguardservice.gettoken();
    }

}
