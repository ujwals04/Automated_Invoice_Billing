import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  company:any


  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.getUser().subscribe((data)=>{
      this.company=data
    },err=>{
      console.error("error in obtaining organization");
    })
  }
  logout() {
    // Replace this logic with your auth service or router logic
    alert('You have been logged out.');
    this.authService.logout();
    // Example: this.authService.logout(); this.router.navigate(['/login']);
  }
  updatePassword() {
    // Add logic here to show password update form or navigate
    alert('Redirecting to Update Password page...');
    // Example: this.router.navigate(['/update-password']);
  }
  
}
