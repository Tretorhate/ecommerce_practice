import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductInfoService } from '../../../../shared/services/product-info/product-info.service';
import { output } from '@angular/core';

@Component({
  selector: 'review-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './review-form.component.html',
})
export class ReviewFormComponent {
  constructor(private productInfoService: ProductInfoService) {}

  isFormLoading = signal(false);
  productId = input<string>(); 
  storeId = input<string>();
  productTitle = input<string>();

  reviewForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    text: new FormControl(''),
  });
close = output<void>()
  sendReview() {
    const productId = this.productId(); 
    const storeId = this.storeId();
    if (!productId || !storeId) return;

    this.isFormLoading.set(true);

    const rating = Number(this.reviewForm.get('rating')?.value);
    const text = this.reviewForm.get('text')?.value ?? '';
    

    this.productInfoService
      .postReview(productId,storeId, { text, rating })
      .subscribe({
        next: () => {
          console.log("form works")
          this.isFormLoading.set(false);
          this.reviewForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.isFormLoading.set(false);
        },
      });
  }
}
