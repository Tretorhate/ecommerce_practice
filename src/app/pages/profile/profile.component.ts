import { Component } from '@angular/core';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';
@Component({
  selector: 'app-profile',
  imports: [OrderHistoryComponent, ProfileInfoComponent,UserReviewsComponent],
  templateUrl: './profile.component.html',
  
})
export class ProfileComponent {
  
}
