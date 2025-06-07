import { Component, ElementRef, ViewChild } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/auth/auth.service';
import { InvoiceService } from './invoices.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
  // invoices = [
  //   { id: 1, title: 'Invoice #001', pdfUrl: 'assets/invoices/Link.pdf' },
  //   { id: 2, title: 'Invoice #002', pdfUrl: 'assets/invoices/Link.pdf' },
  //   { id: 3, title: 'Invoice #003', pdfUrl: 'assets/invoices/Link.pdf' }
  // ];
  constructor(private fb:FormBuilder,private sanitizer: DomSanitizer,private authService:AuthService,private invoiceService:InvoiceService) {}
  organization:any
  customers:any
  items:any
  invoices:any
  purchaseForm!: FormGroup;

  ngOnInit(): void {
    this.authService.getUser().subscribe((data)=>{
      this.organization=data
    },err=>{
      console.error("error in obtaining organization");
    })

    this.invoiceService.getInvoices(this.organization.organizationId).subscribe((data:any[])=>{
      this.invoices=data;
      console.log(data);
    },err=>{
      console.error("error in fetching customers",err);
    });

    this.invoiceService.getCustomers(this.organization.organizationId).subscribe((data:any[])=>{
      this.customers=data;
      console.log(data);
    },err=>{
      console.error("error in fetching customers",err);
    });

    this.invoiceService.getProducts(this.organization.organizationId).subscribe((data:any[])=>{
      this.items=data;
      console.log(data);
    },err=>{
      console.error("error in fetching customers",err);
    });

    this.purchaseForm = this.fb.group({
      customer: ['', Validators.required],
      dueTimestamp: ['', Validators.required,this.futureDateValidator],
      items: this.fb.array([
        this.createItem()
      ])
    });
  }
  async futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison
    return selectedDate > today ? null : { futureDate: true };
  }
  createItem(): FormGroup {
    return this.fb.group({
      itemId: ['', Validators.required],
      typeOfPurchase: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get itemsArray(): FormArray {
    return this.purchaseForm.get('items') as FormArray;
  }

  addItem() {
    this.itemsArray.push(this.createItem());
  }

  removeItem(index: number) {
    if (this.itemsArray.length > 1) {
      this.itemsArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.purchaseForm.valid) {
      const apiData={
        customerId:this.purchaseForm.value.customer,
        associatedWithId:this.organization.organizationId,
        itemsPurchased:this.purchaseForm.value.items,
        purchaseTimeStamp:new Date(),
        dueTimeStamp:this.purchaseForm.value.dueTimestamp
      }
      console.log(apiData)
      this.invoiceService.makePurchase(apiData).subscribe((data:any)=>{
        console.log(data.purchase)
        this.invoices.push(data.purchase.invoiceRes)
      },(err)=>{
        console.log(err)
      })
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
  
  selectedPdfUrl: SafeResourceUrl | null = null;

  openPdf(url: string) {
    url='assets/invoices/'+url+'.pdf'
    this.selectedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeModal() {
    this.selectedPdfUrl = null;
  }
}
