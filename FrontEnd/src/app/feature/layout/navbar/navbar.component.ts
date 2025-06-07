import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;
interface NavItem {
  label: string;
  icon: string;
  route: string;
  type: 'main' | 'bottom';
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() currentRoute = '';

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: 'app/dashboard', type: 'main' },
    { label: 'Customers', icon: 'people', route: 'app/customers', type: 'main' },
    { label: 'Products', icon: 'inventory_2', route: 'app/products', type: 'main' },
    { label: 'Invoices', icon: 'receipt_long', route: 'app/invoices', type: 'main' },
    { label: 'Payments', icon: 'payment', route: 'app/payments', type: 'main' },
    { label: 'Templates', icon: 'description', route: 'app/templates', type: 'main' }
  ];

  bottomNavItems: NavItem[] = [
    { label: 'Get Started', icon: 'rocket_launch', route: 'app/get-started', type: 'bottom' },
    { label: 'Sign Out', icon: 'logout', route: 'app/logout', type: 'bottom' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    if (route === '/logout') {
      // Handle logout logic here
      console.log('Logout clicked');
      return;
    }
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.currentRoute === route || 
           (route === '/dashboard' && this.currentRoute === '/');
  }
}
