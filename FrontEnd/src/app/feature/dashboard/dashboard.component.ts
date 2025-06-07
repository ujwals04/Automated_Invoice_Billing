import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CustomerService } from '../customers/customers.service';
import { ProductService } from '../products/services/product.service';

interface StatsCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  organization:any
  totalrevenue:any
  customers :any[]=[];
  totalOrders:any[]=[];
  pendingInvoices:any
  statsCards: StatsCard[]=[]
  constructor(private custService:CustomerService,private authService:AuthService,private productService:ProductService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((data)=>{
      this.organization=data
    },err=>{
      console.error("error in obtaining organization");
    })

    console.log(this.organization)

    this.custService.getCustomers(this.organization.organizationId).subscribe((data:any[])=>{
      this.customers=data
      this.productService.getProducts(this.organization.organizationId).subscribe((data:any[])=>{
        this.totalOrders=data
        
        this.statsCards = [
          {
            title: 'Total Revenue',
            value: '45,231',
            icon: 'trending_up',
            color: 'success'
          },
          {
            title: 'Active Customers',
            value: String(this.customers.length),
            icon: 'people',
            color: 'primary'
          },
          {
            title: 'Total Orders',
            value: String(this.totalOrders.length),
            icon: 'shopping_cart',
            color: 'warning'
          },
          {
            title: 'Pending Invoices',
            value: '23',
            icon: 'receipt_long',
            color: 'info'
          }
        ];
      },err=>{
        console.error("error in fetching products",err);
      });
    },err=>{
      console.error("error in fetching customers",err);
    });

    console.log(this.customers)

    

    console.log(this.totalOrders)

    
        
  }

  getChangeClass(changeType: string): string {
    switch (changeType) {
      case 'positive':
        return 'change-positive';
      case 'negative':
        return 'change-negative';
      default:
        return 'change-neutral';
    }
  }

}
