import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth:AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getAccessToken();

        if(token){
            req= req.clone({
                setHeaders:{
                    Authorization:token
                },
                withCredentials:true
            });
        }
        else{
            req = req.clone({withCredentials:true});
        }
        return next.handle(req);
    }
}