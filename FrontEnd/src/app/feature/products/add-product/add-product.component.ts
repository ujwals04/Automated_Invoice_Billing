import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  items: any[] = [];
  userData: any;
  user: any;
  organization: any;

  newItemForm!: FormGroup;
  updateItemForm!: FormGroup;

  selectedItem: any = null;
  selectedItemId: number | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((data) => {
      this.organization = data;
      this.initForms();
      this.fetchProducts();
    }, err => {
      console.error("Error in obtaining organization");
    });
  }

  initForms(): void {
    const formStructure = {
      itemName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      description: ['', Validators.required],
      typeOfSale: ['', Validators.required],
      specifications: this.fb.array([this.fb.control('')]),
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      discountPercentage: ['', [Validators.required, this.validatePercentage]],
      taxPercentage: ['', [Validators.required, this.validatePercentage]],
      rentType: ['', Validators.required],
      reminderType: ['', Validators.required],
      reminderBefore: ['', [Validators.required, Validators.min(0)]],
      limitOfReminders: ['', [Validators.required, this.validateReminderLimit]],
      associatedWith: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]]
    };

    this.newItemForm = this.fb.group(formStructure);
    this.updateItemForm = this.fb.group(formStructure);
  }

  fetchProducts(): void {
    this.productService.getProducts(this.organization.organizationId).subscribe((data: any[]) => {
      this.items = data;
    }, err => {
      console.error("Error in fetching products", err);
    });
  }

  get specifications(): FormArray {
    return this.newItemForm.get('specifications') as FormArray;
  }

  get updateSpecifications(): FormArray {
    return this.updateItemForm.get('specifications') as FormArray;
  }

  addSpecification(): void {
    this.specifications.push(this.fb.control(''));
  }

  removeSpecification(index: number): void {
    if (this.specifications.length > 1) {
      this.specifications.removeAt(index);
    }
  }

  addUpdateSpecification(): void {
    this.updateSpecifications.push(this.fb.control(''));
  }

  removeUpdateSpecification(index: number): void {
    if (this.updateSpecifications.length > 1) {
      this.updateSpecifications.removeAt(index);
    }
  }

  validatePercentage(control: AbstractControl): ValidationErrors | null {
    const value = parseFloat(control.value);
    return isNaN(value) || value < 0 || value > 100 ? { invalidPercentage: true } : null;
  }

  validateReminderLimit(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);
    return (!Number.isInteger(value) || value < 1 || value > 5) ? { invalidLimit: true } : null;
  }

  onSubmit(): void {
    const formData = {
      prodName: this.newItemForm.value.itemName,
      description: this.newItemForm.value.description,
      typeOfSale: this.newItemForm.value.typeOfSale,
      specifications: this.newItemForm.value.specifications,
      price: Number(this.newItemForm.value.price),
      discountPercentage: Number(this.newItemForm.value.discountPercentage),
      taxPercentage: Number(this.newItemForm.value.taxPercentage),
      rentType: this.newItemForm.value.rentType,
      remainderType: this.newItemForm.value.reminderType,
      remainderBefore: this.newItemForm.value.reminderBefore,
      limitOfRemainders: this.newItemForm.value.limitOfReminders,
      associatedWith: this.organization.organizationId
    };

    this.productService.addProduct(formData).subscribe((data) => {
      this.items.push(data);
    }, (err) => {
      console.error("Error in form submission", err);
    });
  }

  prepareRemove(item: any): void {
    this.selectedItem = item;
  }

  onClickRemove(): void {
    if (!this.selectedItem) return;
    this.productService.removeProduct(this.selectedItem.prodId).subscribe(() => {
      this.items = this.items.filter(obj => obj.prodId !== this.selectedItem.prodId);
      this.selectedItem = null;
    }, err => {
      console.error("Error in removing product", err);
    });
  }

  loadItemForUpdate(item: any): void {
    this.selectedItemId = item.prodId;

    this.updateItemForm.patchValue({
      itemName: item.prodName,
      description: item.description,
      typeOfSale: item.typeOfSale,
      price: item.price,
      discountPercentage: item.discountPercentage,
      taxPercentage: item.taxPercentage,
      rentType: item.rentType,
      reminderType: item.remainderType,
      reminderBefore: item.remainderBefore,
      limitOfReminders: item.limitOfRemainders,
      associatedWith: this.organization.organizationId
    });

    // Reset and set specifications
    this.updateSpecifications.clear();
    item.specifications.forEach((spec: string) => {
      this.updateSpecifications.push(this.fb.control(spec));
    });
  }

  onUpdateSubmit(): void {
    if (this.selectedItemId === null) return;

    const updatedData = {
      prodName: this.updateItemForm.value.itemName,
      description: this.updateItemForm.value.description,
      typeOfSale: this.updateItemForm.value.typeOfSale,
      specifications: this.updateItemForm.value.specifications,
      price: Number(this.updateItemForm.value.price),
      discountPercentage: Number(this.updateItemForm.value.discountPercentage),
      taxPercentage: Number(this.updateItemForm.value.taxPercentage),
      rentType: this.updateItemForm.value.rentType,
      remainderType: this.updateItemForm.value.reminderType,
      remainderBefore: this.updateItemForm.value.reminderBefore,
      limitOfRemainders: this.updateItemForm.value.limitOfReminders,
      associatedWith: this.organization.organizationId,
      prodId: this.selectedItemId // Added prodId here
    };

    // this.productService.updateProduct(updatedData).subscribe(
    //   (res: any) => {
    //     const index = this.items.findIndex(item => item.prodId === this.selectedItemId);
    //     if (index > -1) {
    //       this.items[index] = res;
    //     }
    //     this.selectedItemId = null;
    //   },
    //   (err: any) => {
    //     console.error("Error updating product", err);
    //   }
    // );
  }

}
