import { Component, signal } from '@angular/core';
import { ProfileService } from '../../../../shared/services/profile/profile.service';
import { Review } from '../../../../shared/models/review.model';
import { CommonModule } from '@angular/common';
import { ProductInfoService } from '../../../../shared/services/product-info/product-info.service';

@Component({
  selector: 'user-reviews',
  imports: [CommonModule],
  templateUrl: './user-reviews.component.html',
 
})
export class UserReviewsComponent {
  constructor(private profileService: ProfileService, private productInfoService: ProductInfoService){

}
 
isReviewsLoading = signal(false);
reviews = signal<Review[]>([]);

getReviews(){
  this.isReviewsLoading.set(true)
  this.profileService.getProfile().subscribe({
    next: (res) =>{
  
      this.reviews.set(res.reviews)
      this.isReviewsLoading.set(false)
    },
       error:(err) =>{
      this.isReviewsLoading.set(false)
      console.log(err)
    }
  })
}
ngOnInit() {
  this.getReviews()
  this.productInfoService.reviewSubmitted.subscribe(() => {
      this.getReviews();
    });
}

}
