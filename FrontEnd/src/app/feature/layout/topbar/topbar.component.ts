import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  @Input() showMenuButton = false;
  @Output() menuToggle = new EventEmitter<void>();

  searchQuery = '';

  constructor() {}

  onMenuToggle() {
    this.menuToggle.emit();
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Implement search functionality here
    }
  }

  onProfileMenuClick() {
    console.log('Profile menu clicked');
    // Implement profile menu functionality here
  }

  onNotificationsClick() {
    console.log('Notifications clicked');
    // Implement notifications functionality here
  }
}
