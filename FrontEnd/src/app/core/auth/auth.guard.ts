import { Injectable, } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { take,map, Observable } from "rxjs";

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate{
    constructor(private auth:AuthService,private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean | UrlTree {
       console.log("calleed"+this.auth.isLoggedIn());
        if(this.auth.isLoggedIn()){
            return true;
        }
        alert("please login");
        this.router.navigate(['/login']);
        return false;
    }
}
