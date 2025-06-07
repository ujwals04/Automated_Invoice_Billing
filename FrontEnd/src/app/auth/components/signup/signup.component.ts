import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from './signup.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/user.model';


declare var feather: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private fb:FormBuilder,private regService:RegistrationService,private router:Router,private authService:AuthService){}

  organizationForm: FormGroup = new FormGroup({});
  successMsg:any=""
  errorMsg:any=""
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;

  industries = [
    'Agriculture',
    'Art and Design',
    'Consulting',
    'Engineering',
    'Education',
    'Healthcare',
    'Technology',
    'Finance',
    'Others...'
  ];

  countries = [
    'India',
    'Bangladesh',
    'Bhutan',
    'China',
    'Pakistan',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan'
  ];

  ngOnInit(): void {
    this.organizationForm = this.fb.group({
      orgName: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      pwd: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      ]],
      confirmPwd: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }
  ngAfterViewInit(): void {
    // Initialize Feather icons after view is rendered
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
  

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('pwd');
    const confirmPassword = form.get('confirmPwd');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.organizationForm.get(fieldName);
    if (errorType) {
      return field ? field.hasError(errorType) && (field.dirty || field.touched) : false;
    }
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
  
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }


  // Helper method to check if field has error
  

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const field = this.organizationForm.get(fieldName);
    if (field?.errors && (field.dirty || field.touched)) {
      const errors = field.errors;
      
      if (errors['required']) {
        switch (fieldName) {
          case 'orgName': return 'Please enter your organization name.';
          case 'industry': return 'Please select a valid industry.';
          case 'country': return 'Please enter country of origin.';
          case 'pincode': return 'Please enter code details.';
          case 'address': return 'Please enter your organization address.';
          case 'email': return 'Please enter your email.';
          case 'phone': return 'Please enter contact details.';
          case 'pwd': return 'Password is required.';
          case 'confirmPwd': return 'Please confirm your password.';
          default: return 'This field is required.';
        }
      }
      
      if (errors['email']) return 'Please enter a valid email.';
      if (errors['pattern']) {
        if (fieldName === 'pincode') return 'Please enter a valid 6-digit code.';
        if (fieldName === 'phone') return 'Please enter a valid 10-digit number.';
        if (fieldName === 'pwd') return 'Password must meet requirements.';
      }
      if (errors['passwordMismatch']) return 'Passwords do not match.';
    }
    return '';
  }

  // Helper method to check password requirements
  getPasswordRequirements() {
    const password = this.organizationForm.get('pwd')?.value || '';
    return [
      { text: 'At least 8 characters long', met: password.length >= 8 },
      { text: 'Includes uppercase and lowercase', met: /(?=.*[a-z])(?=.*[A-Z])/.test(password) },
      { text: 'Contains at least one number', met: /(?=.*\d)/.test(password) },
      { text: 'At least one special character', met: /(?=.*[@$!%*?&])/.test(password) }
    ];
  }

  onSubmit(){
    if(this.organizationForm.valid){
      this.regService.registerOrganization(this.organizationForm.value).subscribe({
        next:(response)=>{
          const accessToken = response.headers.get('Authorization');
          const user = response.body as User;
          if(accessToken){
            this.authService.setAccessToken(accessToken);
          }
          if(user){
            this.authService.setUser(user);
          }
          this.router.navigate(['/app/dashboard']);
        },error:(err)=>{
          this.errorMsg = err.error;
        }
      })
    }
  }
  
}
