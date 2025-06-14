import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInfoService } from '../../../../shared/services/product-info/product-info.service';
import { Review } from '../../../../shared/models/review.model';

@Component({
  selector: 'review-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
})
export class ReviewListComponent {
  constructor(
    private productInfoService: ProductInfoService,
    
  ) {}

  isReviewsLoading = signal(false);
  productReviews = signal<Review[]>([]);
   productId = input("");

  getProductReviews(productId:string) {
    this.isReviewsLoading.set(true);
    
    
    this.productInfoService.fetchReviews(productId).subscribe({
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
