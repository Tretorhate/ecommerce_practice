import { Component, signal } from '@angular/core';
import { ProfileService } from '../../../../shared/services/profile/profile.service';
import { Order } from '../../../../shared/models/order.model';
import { CommonModule } from '@angular/common';
import { OrderStatusPipe } from './order-status.pipe';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { OrderItemComponent } from '../order-item/order-item.component';


@Component({
  selector: 'order-history',
  imports: [CommonModule, OrderStatusPipe,OrderItemComponent],
  templateUrl: './order-history.component.html',
  
})

export class OrderHistoryComponent {

  constructor(private profileService: ProfileService){
  
  }

isOrdersLoading = signal(false);
orders = signal<Order[]>([]);


getOrders(){
  this.isOrdersLoading.set(true);
  this.profileService.getProfile().subscribe({
    next: (res) =>{
    
      this.orders.set(res.orders)
      this.isOrdersLoading.set(false)
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
