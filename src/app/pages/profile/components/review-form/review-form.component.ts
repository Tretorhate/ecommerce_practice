import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductReviewService } from '../../../../shared/services/product-review/product-review.service';
import { output } from '@angular/core';
import { Error } from '../../../../shared/models/error.model';

@Component({
  selector: 'review-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './review-form.component.html',
})
export class ReviewFormComponent {
  constructor(private productReviewService: ProductReviewService) {}

  formError = signal<Error>({ status: '', statusText: '' });
  isFormLoading = signal(false);
  productId = input<string>();
  storeId = input<string>();
  productTitle = input<string>();

  reviewForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    text: new FormControl(''),
  });
  close = output<void>();
  sendReview() {
    const productId = this.productId();
    const storeId = this.storeId();
    if (!productId || !storeId) return;

    this.isFormLoading.set(true);

    const rating = Number(this.reviewForm.get('rating')?.value);
    const text = this.reviewForm.get('text')?.value ?? '';

    this.productReviewService
      .postReview(productId, storeId, { text, rating })
      .subscribe({
        next: () => {
          this.isFormLoading.set(false);
          this.reviewForm.reset();
        },
        error: (err) => {
      
          this.formError.set({
            status: err.status,
            statusText: err.statusText,
          });
          this.isFormLoading.set(false);
        },
      });
  }
}
