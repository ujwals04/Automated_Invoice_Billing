import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class CustomerService{
    private getCustomersUrl="http://localhost:3000/getCustomers/";
    private removeCustomersUrl="http://localhost:3000/removeCustomer/"
    private apiUrl="http://localhost:3000/addCustomer";

    constructor(private http:HttpClient){}

    putCustomer(formData:any):Observable<any[]>{
        return this.http.post<any[]>(this.apiUrl,formData);
    }


    getCustomers(orgId:any):Observable<any[]>{
        return this.http.get<any[]>(this.getCustomersUrl+orgId);
    }

    removeCustomer(custId:any):Observable<any[]>{
        return this.http.delete<any[]>(this.removeCustomersUrl+custId);
    }

}