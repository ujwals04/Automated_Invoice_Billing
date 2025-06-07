import { Component, OnInit, OnDestroy } from '@angular/core';

interface PricingCard {
  id: string;
  emoji: string;
  title: string;
  description: string;
  price: string;
  priceLabel: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  badge?: string;
  isPopular?: boolean;
}

@Component({
  selector: 'app-pricing-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = 1; // Start with Professional in center
  isHovered = false;
  autoRotateInterval: any = null;

  pricingCards: PricingCard[] = [
    {
      id: "basic",
      emoji: "📊",
      title: "Basic Billing",
      description: "Perfect for startups and small businesses",
      price: "$9",
      priceLabel: "/mo",
      features: [
        "Up to 50 invoices/month",
        "Basic templates",
        "Email support",
        "Payment tracking"
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-slate-100 text-slate-700 hover:bg-slate-200"
    },
    {
      id: "professional",
      emoji: "🚀",
      title: "Professional",
      description: "Ideal for growing businesses",
      price: "$29",
      priceLabel: "/mo",
      features: [
        "Unlimited invoices",
        "Custom branding",
        "Priority support",
        "Advanced reporting",
        
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "bg-blue-500 text-white hover:bg-blue-600",
    },
    {
      id: "enterprise",
      emoji: "🏢",
      title: "Enterprise",
      description: "For large organizations",
      price: "$99",
      priceLabel: "/mo",
      features: [
        "Everything in Pro",
        "Multi-company support",
        "24/7 phone support",
        "Custom integrations",
        
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-amber-500 text-white hover:bg-amber-600"
    }
  ];

  ngOnInit() {
    this.startAutoRotate();
  }

  ngOnDestroy() {
    this.stopAutoRotate();
  }

  getCardTransform(cardIndex: number) {
    const position = (cardIndex - this.currentIndex + 3) % 3;
    
    switch (position) {
      case 0: // Left
        return {
          translateX: -150,
          scale: 0.85,
          opacity: 0.7,
          zIndex: 1
        };
      case 1: // Center
        return {
          translateX: 0,
          scale: 1,
          opacity: 1,
          zIndex: 3
        };
      case 2: // Right
        return {
          translateX: 150,
          scale: 0.85,
          opacity: 0.7,
          zIndex: 1
        };
      default:
        return {
          translateX: 0,
          scale: 0.85,
          opacity: 0.7,
          zIndex: 1
        };
    }
  }

  nextCard() {
    this.currentIndex = (this.currentIndex + 1) % this.pricingCards.length;
  }

  goToCard(index: number) {
    this.currentIndex = index;
  }

  startAutoRotate() {
    if (!this.isHovered && !this.autoRotateInterval) {
      this.autoRotateInterval = setInterval(() => {
        this.nextCard();
      }, 3500);
    }
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  onMouseEnter() {
    this.isHovered = true;
    this.stopAutoRotate();
  }

  onMouseLeave() {
    this.isHovered = false;
    this.startAutoRotate();
  }

  isCenter(index: number): boolean {
    return (index - this.currentIndex + 3) % 3 === 1;
  }

  getCardStyles(index: number) {
    const transform = this.getCardTransform(index);
    return {
      'transform': `translateX(${transform.translateX}px) scale(${transform.scale})`,
      'opacity': transform.opacity,
      'z-index': transform.zIndex
    };
  }
}
