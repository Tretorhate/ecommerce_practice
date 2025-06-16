import { Component, input, signal } from '@angular/core';
import { OrderItem } from '../../../../shared/models/order-item.model';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'order-item',
  imports: [ReviewFormComponent],
  templateUrl: './order-item.component.html',

})
export class OrderItemComponent {
  item = input<OrderItem>()
 isItemReviewing = signal(false);
  toggleReviewForm() {
    this.isItemReviewing.update(v => !v);
  }
}