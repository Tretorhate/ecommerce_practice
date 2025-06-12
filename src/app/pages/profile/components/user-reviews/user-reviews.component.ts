import { Component } from '@angular/core';
import { ProfileService } from '../../../../shared/services/profile/profile.service';

@Component({
  selector: 'user-reviews',
  imports: [],
  templateUrl: './user-reviews.component.html',
 
})
export class UserReviewsComponent {
  constructor(private profileService: ProfileService){

}
getReviews(){
  this.profileService.getProfile().subscribe({
    next: (res) =>{
      // this.profileInfo = res;
    }
  })
}
ngOnInit() {
  this.getReviews();
}

}
