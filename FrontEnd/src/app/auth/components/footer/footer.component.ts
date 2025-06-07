import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  formData: ContactFormData = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = false;
  isSubmitted = false;
  submitError = '';
  isExpanded = false;

  constructor() {}

  ngOnInit() {}

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  scrollToSection(sectionId: string) {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  onSubmit() {
    if (this.isSubmitting || this.isSubmitted) {
      return;
    }

    // Basic validation
    if (!this.formData.name.trim() || !this.formData.email.trim() || !this.formData.message.trim()) {
      this.submitError = 'Please fill in all fields';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.submitError = 'Please enter a valid email address';
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    }, 2000);
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
    this.isSubmitted = false;
    this.submitError = '';
  }

  // Social media links (placeholder implementations)
  openLinkedIn() {
    window.open('https://linkedin.com', '_blank');
  }

  openInstagram() {
    window.open('https://instagram.com', '_blank');
  }

  openGitHub() {
    window.open('https://github.com', '_blank');
  }
}