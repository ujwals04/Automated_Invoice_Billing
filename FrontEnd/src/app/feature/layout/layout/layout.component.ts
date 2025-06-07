import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  
  title = 'admin-dashboard';
  isHandset = false;
  sidenavOpened = true;
  currentRoute = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    // Monitor screen size changes
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isHandset = result.matches;
        if (this.isHandset) {
          this.sidenavOpened = false;
        } else {
          this.sidenavOpened = true;
        }
      });

    // Track current route for active menu highlighting
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          // Close sidenav on mobile after navigation
          if (this.isHandset && this.drawer) {
            this.drawer.close();
          }
        }
      });
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  onSidenavToggle() {
    this.sidenavOpened = this.drawer.opened;
  }
}
