import { Component, signal, OnInit } from '@angular/core';
import { ProfileService } from '../../../../shared/services/profile/profile.service';
import { Order } from '../../../../shared/models/order.model';
import { CommonModule } from '@angular/common';
import { OrderStatusPipe } from './order-status.pipe';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'order-history',
  imports: [CommonModule, OrderStatusPipe, OrderItemComponent],
  templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent implements OnInit {
  constructor(private profileService: ProfileService) {}

  isOrdersLoading = signal(false);
  orders = signal<Order[]>([]);
  error = signal<string | null>(null);

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.isOrdersLoading.set(true);
    this.error.set(null);

    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.orders.set(profile.orders || []);
        this.isOrdersLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.error.set('Failed to load orders. Please try again.');
        this.isOrdersLoading.set(false);
      },
    });
  }

  refreshOrders() {
    this.getOrders();
  }
}
