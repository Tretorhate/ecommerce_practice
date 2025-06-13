import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ProductInfoService } from '../../../../shared/services/product-info/product-info.service';
import { Review } from '../../../../shared/models/review.model';

@Component({
  selector: 'review-list',
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
  
})
export class ReviewListComponent {
constructor (private productInfoService: ProductInfoService){

}
isReviewsLoading = signal(false);
productReviews = signal<Review[]>([])
getProductReviews(){
  this.isReviewsLoading.set(true)

  this.isReviewsLoading.set(true)
  this.productInfoService.fetchReviews().subscribe({
    next: (res) =>{
      this.productReviews.set(res)
    },
       error:(err) =>{
      this.isReviewsLoading.set(false)
      console.log(err)
    }
  })
}
ngOnInit() {
  this.getProductReviews();
}
}