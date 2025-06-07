import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class LoginService{
    private apiUrl="http://localhost:3000/signin";

    constructor(private http:HttpClient){}

    checkOrganization(formData:any):Observable<any>{
        const apiData ={
            email: formData.email,
            password: formData.password,
        }
        return this.http.post(this.apiUrl,apiData,{
            observe:'response',
            withCredentials:true
        });
    }
}