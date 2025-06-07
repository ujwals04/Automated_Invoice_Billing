import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TemplateService } from './services/template.service';
import { InvoiceTemplate } from './models/template';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent {
  @Input() selectedTemplate: InvoiceTemplate | null = null;
  // @Output() templateSelected = new EventEmitter<InvoiceTemplate>();
  
  templates: InvoiceTemplate[] = [];
  loading = true;

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.templateService.getTemplates().subscribe({
      next: (templates) => {
        this.templates = templates;
        this.loading = false;
        
        // Select first template by default if none selected
        // if (!this.selectedTemplate && templates.length > 0) {
          this.selectTemplate(templates[0]);
        // }
      },
      error: (error) => {
        console.error('Error loading templates:', error);
        this.loading = false;
      }
    });
  }

  selectTemplate(template: InvoiceTemplate): void {
    this.selectedTemplate = template;
    // this.templateSelected.emit(template);
  }

  isSelected(template: InvoiceTemplate): boolean {
    return this.selectedTemplate?.id === template.id;
  }

}
