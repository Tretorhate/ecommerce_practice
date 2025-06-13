import { Component, signal } from '@angular/core';
import { ProfileService } from '../../../../shared/services/profile/profile.service';
import { Order } from '../../../../shared/models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-history',
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  
})

export class OrderHistoryComponent {

  constructor(private profileService: ProfileService){
  
  }

isOrdersLoading = signal(false);
orders = signal<Order[]>([])
getOrders(){
  this.isOrdersLoading.set(true);
  this.profileService.getProfile().subscribe({
    next: (res) =>{
      this.orders.set(res.orders)
    },
     error:(err) =>{
      this.isOrdersLoading.set(false)
      console.log(err)
    }
  })
}
ngOnInit() {
  this.getOrders();
}
}
