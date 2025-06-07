export interface Product {
    prodId: string;
  prodName: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  inStock: boolean;
  imageUrl?: string;
  features?: string[];
  rating?: number;
  createdDate: Date;
}
