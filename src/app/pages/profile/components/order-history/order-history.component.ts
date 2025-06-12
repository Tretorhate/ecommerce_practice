import { Component } from '@angular/core';
import { ProfileService } from '../../../../shared/services/profile/profile.service';

@Component({
  selector: 'order-history',
  imports: [],
  templateUrl: './order-history.component.html',
  
})
export class OrderHistoryComponent {
  constructor(private profileService: ProfileService){
  
  }
getOrders(){
  this.profileService.getProfile().subscribe({
    next: (res) =>{
      // this.profileInfo = res;
    }
  })
}
ngOnInit() {
  this.getOrders();
}
}
