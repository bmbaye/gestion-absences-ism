import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../pages/security/auth-service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const requiredRoles = route.data['roles'] as string[];
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }

        const hasRole = requiredRoles.some(role => this.authService.getUserRoles().includes(role));
        if (!hasRole) {
            this.router.navigate(['/acces-refuse']);
            return false;
        }
        return true;
    }

}
