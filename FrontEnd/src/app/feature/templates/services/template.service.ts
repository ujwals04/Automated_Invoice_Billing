import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InvoiceTemplate } from '../models/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates: InvoiceTemplate[] = [
    {
      id: 'modern-blue',
      name: 'Modern Blue',
      description: 'Clean and modern design with blue accents',
      thumbnailUrl: '',
      primaryColor: '#2563eb',
      secondaryColor: '#f1f5f9',
      fontFamily: 'Inter, sans-serif',
      style: 'modern'
    },
    {
      id: 'classic-green',
      name: 'Classic Green',
      description: 'Traditional layout with professional green theme',
      thumbnailUrl: '',
      primaryColor: '#059669',
      secondaryColor: '#f0fdf4',
      fontFamily: 'Georgia, serif',
      style: 'classic'
    },
    {
      id: 'minimal-gray',
      name: 'Minimal Gray',
      description: 'Minimalist design with subtle gray tones',
      thumbnailUrl: '',
      primaryColor: '#374151',
      secondaryColor: '#f9fafb',
      fontFamily: 'Helvetica, Arial, sans-serif',
      style: 'minimal'
    },
    {
      id: 'corporate-navy',
      name: 'Corporate Navy',
      description: 'Professional corporate design with navy blue',
      thumbnailUrl: '',
      primaryColor: '#1e3a8a',
      secondaryColor: '#eff6ff',
      fontFamily: 'Times New Roman, serif',
      style: 'corporate'
    }
  ];

  getTemplates(): Observable<InvoiceTemplate[]> {
    return of(this.templates);
  }

  getTemplateById(id: string): Observable<InvoiceTemplate | undefined> {
    return of(this.templates.find(template => template.id === id));
  }
}
