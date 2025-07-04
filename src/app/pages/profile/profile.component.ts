import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [OrderHistoryComponent, ProfileInfoComponent, UserReviewsComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
