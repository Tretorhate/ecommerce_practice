import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductReviewService } from '../../../../shared/services/product-review/product-review.service';
import { Review } from '../../../../shared/models/review.model';

@Component({
  selector: 'review-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
})
export class ReviewListComponent {
  constructor(private productReviewService: ProductReviewService) {}

  isReviewsLoading = signal(false);
  productReviews = signal<Review[]>([]);
  productId = input('');

  getProductReviews(productId: string) {
    this.isReviewsLoading.set(true);

    this.productReviewService.fetchReviews(productId).subscribe({
      next: (res) => {
        this.productReviews.set(res);
        this.isReviewsLoading.set(false);
      },
      error: (err) => {
        this.isReviewsLoading.set(false);
        console.log(err);
      },
    });
  }

  ngOnInit() {
    if (this.productId) {
      this.getProductReviews(this.productId());
    }
  }
}
