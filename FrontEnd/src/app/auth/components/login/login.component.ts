import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router:Router, private loginService:LoginService,private authService:AuthService) { }

  public loginForm: FormGroup = new FormGroup({});
  isSubmitting = false;
  showPassword = false;
  submitted:boolean=false;
  successMsg:any=""
  errorMsg:any=""

  

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    // Initialize Feather icons after view init
    setTimeout(() => {
      if (typeof (window as any).feather !== 'undefined') {
        (window as any).feather.replace();
      }
    }, 100);
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

    // Clear messages when form values change
    this.loginForm.valueChanges.subscribe(() => {
      this.clearMessages();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    // Re-initialize Feather icons after toggling
    setTimeout(() => {
      if (typeof (window as any).feather !== 'undefined') {
        (window as any).feather.replace();
      }
    }, 10);
  }

  

  private markAllFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  private clearMessages(): void {
    this.successMsg = '';
    this.errorMsg = '';
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loginService.checkOrganization(this.loginForm.value).subscribe({
        next:(response)=>{
          console.log(response)
          const accessToken = response.headers.get('Authorization');
          const user = response.body as User;
          if(accessToken){
            this.authService.setAccessToken(accessToken);
          }
          if(user){
            this.authService.setUser(user);
          }
          console.log("user and token are set"+accessToken+response.body+response.headers)
          if(accessToken && user){
          this.router.navigate(['/app/dashboard']);
          }
        },error:(err)=>{
          this.errorMsg = err.error;
        }
      })
    }
  }
}
