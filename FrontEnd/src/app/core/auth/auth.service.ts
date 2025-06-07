import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})

export class AuthService{

    private accessToken:string='';
    private userSubject = new BehaviorSubject<User |null>(null);

    constructor(private http:HttpClient,private router:Router){}
    setAccessToken(token:string){
        this.accessToken = token;
    }

    getAccessToken():string | null{
        return this.accessToken;
    }

    setUser(userData:any){
        this.userSubject.next(userData);
    }

    getUser(){
        return this.userSubject.asObservable();
    }

    tryRestoreSession(){
        console.log("refresh token called");
        this.http.get('http://localhost:3000/refresh-token',{
            observe:'response',
            withCredentials:true
        }).subscribe({
            next:res=>{
                console.log("hello");
                const accessToken = res.headers.get('Authorization')|| '';
                const user = res.body as User;
                this.setAccessToken(accessToken);
                this.setUser(user);
                console.log(accessToken);
                console.log(user);
            },error:()=>{
                this.router.navigate(['/signin']);
            }
        })
    }

    isLoggedIn():boolean{
        return !!this.getAccessToken();
    }
    logout(){
        // this.accessToken = '';
        // this.userSubject.next(null);
        this.http.post('http://localhost:3000/logout',{},{withCredentials:true}).subscribe(()=>{
            console.log("user succesfully logged out");
            this.accessToken = '';
            this.userSubject.next(null);
        }
            
        );
        this.router.navigate(['/signin']);
    }
}