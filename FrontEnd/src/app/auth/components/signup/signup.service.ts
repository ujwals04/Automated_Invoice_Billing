import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class RegistrationService{
    private apiUrl="http://localhost:3000/signup";

    constructor(private http:HttpClient){}

    registerOrganization(formData:any):Observable<any>{
       
        const apiData ={
        organizationName: formData.orgName,
        industryType: formData.industry,
        country: formData.country,
        postalCode: formData.pincode,
        address: formData.address,
        email: formData.email,
        contactNo: formData.phone,
        password: formData.pwd,
        }
        console.log(apiData+"apidataaaaaaaaa")
        return this.http.post(this.apiUrl,apiData,{
            observe:'response',
            withCredentials:true});
    }

    
}