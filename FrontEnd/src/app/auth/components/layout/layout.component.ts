import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  title = 'BillMate';

  ngOnInit() {
    // Initialize any global app settings
    this.initializeTheme();
  }

  private initializeTheme() {
    // Set up any theme or accessibility preferences
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      // Future dark mode implementation
    }
  }
}
