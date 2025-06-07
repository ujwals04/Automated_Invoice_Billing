import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  features: Feature[] = [
    {
      icon: 'fas fa-receipt',
      title: 'Smart Billing',
      description: 'Automated invoice generation with customizable templates and professional layouts.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Analytics Dashboard',
      description: 'Real-time insights into your billing performance and revenue trends.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure Payments',
      description: 'Bank-level security with multiple payment gateways and fraud protection.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Ready',
      description: 'Access your billing system anywhere with our responsive mobile interface.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: 'fas fa-cogs',
      title: 'Integration',
      description: 'Seamlessly connect with your existing business tools and workflows.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with any questions.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  currentSlide = 0;
  slideInterval: any;
  isVisible = {
    hero: false,
    about: false,
    features: false
  };

  constructor(private router:Router) {}

  ngOnInit() {
    this.startSlideshow();
    this.checkVisibility();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkVisibility();
  }

  private checkVisibility() {
    const heroSection = document.querySelector('#hero');
    const aboutSection = document.querySelector('#about');
    const featuresSection = document.querySelector('#features');

    if (heroSection) {
      this.isVisible.hero = this.isElementInViewport(heroSection);
    }
    if (aboutSection) {
      this.isVisible.about = this.isElementInViewport(aboutSection);
    }
    if (featuresSection) {
      this.isVisible.features = this.isElementInViewport(featuresSection);
    }
  }

  private isElementInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  private startSlideshow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.features.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.features.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  scrollToSection(sectionId: string) {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  getStarted() {
    // Placeholder for get started action
    console.log('Get started clicked');
    this.router.navigate(['/signup'])
  }

  learnMore() {
    this.scrollToSection('#about');
  }

}
