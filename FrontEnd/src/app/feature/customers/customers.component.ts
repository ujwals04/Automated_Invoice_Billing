import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customers.service';

import { AuthService } from 'src/app/core/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers :any[]=[];
  userData:any ;
  user:any;
  organization:any
  newCustomerForm!: FormGroup;
  constructor(private fb: FormBuilder,private custService:CustomerService,private authService:AuthService){};
  ngOnInit(): void {
    this.authService.getUser().subscribe((data)=>{
      this.organization=data
    },err=>{
      console.error("error in obtaining organization");
    })

    this.newCustomerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      billingAddress: ['', [Validators.required]],
      associatedWith: [this.organization.organizationName, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]]
    });

    this.custService.getCustomers(this.organization.organizationId).subscribe((data:any[])=>{
      this.customers=data;
      console.log(data);
    },(error)=>{
      console.error("error in fetching customers",error);
    });
  }
  submitted=false
  formData:any
  onSubmit(){
    this.formData={
      custName:this.newCustomerForm.value.customerName,
      custEmail:this.newCustomerForm.value.customerEmail,
      custPhone:this.newCustomerForm.value.customerPhone,
      billingAddress:this.newCustomerForm.value.billingAddress,
      associatedWith:this.organization.organizationId
    }
    this.custService.putCustomer(this.formData).subscribe((data)=>{
      console.log(data)
      this.customers.push(data)
    },(error)=>{
      console.error("error in Form submission",error);
    });
  }
  selectedCustomer: any = null;  // You can strongly type this if needed

      // Called when "Remove" is clicked
      prepareRemove(item: any) {
        this.selectedCustomer = item;
      }
  onClickRemove(){
    this.custService.removeCustomer(this.selectedCustomer.custId).subscribe((data:any[])=>{
      this.customers=this.customers.filter(obj=>obj.custId!=this.selectedCustomer.custId);
      console.log(data);
    },err=>{
      console.error("error in Removing customer",err);
    });
  }
}
