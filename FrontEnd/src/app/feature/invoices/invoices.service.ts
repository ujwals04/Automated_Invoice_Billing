import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class InvoiceService{
    private invoicesUrl="http://localhost:3000/getInvoice/";
    private customersUrl="http://localhost:3000/getCustomers/";
    private productsUrl="http://localhost:3000/getProducts/";
    private purchaseUrl="http://localhost:3000/makePurchase"

    constructor(private http:HttpClient){}

    getInvoices(associatedWith:any):Observable<any[]>{
        return this.http.get<any[]>(this.invoicesUrl+associatedWith);
    }
    getCustomers(associatedWith:any):Observable<any[]>{
        return this.http.get<any[]>(this.customersUrl+associatedWith);
    }
    getProducts(associatedWith:any):Observable<any[]>{
        return this.http.get<any[]>(this.productsUrl+associatedWith);
    }
    makePurchase(apiData:any):Observable<any[]>{
        return this.http.post<any[]>(this.purchaseUrl,apiData);
    }
   
}