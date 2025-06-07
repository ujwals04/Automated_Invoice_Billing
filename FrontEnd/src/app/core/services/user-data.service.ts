import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable(
    {
        providedIn:'root'
    }
)

export class UserDataService{
    private userSource = new BehaviorSubject<any>(null);
    currentUser$ = this.userSource.asObservable();

    setUser(data:any){
        this.userSource.next(data);
        
    }

    getUser(){
        return this.userSource.getValue();
    }

}

