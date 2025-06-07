export interface InvoiceTemplate {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    style: 'modern' | 'classic' | 'minimal' | 'corporate' | 'custom';
    customHtml?: string;
    customCss?: string;
  }
  