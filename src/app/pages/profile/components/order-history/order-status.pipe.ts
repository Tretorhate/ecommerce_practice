import { Pipe, PipeTransform } from '@angular/core';
import { OrderUtilsService } from '../../../../shared/services/order-utils.service';

@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  constructor(private orderUtils: OrderUtilsService) {}

  transform(
    value: 'PENDING' | 'PAYED' | 'CANCELLED' | 'SHIPPED' | 'DELIVERED'
  ): string {
    return this.orderUtils.getOrderStatusText(value);
  }
}
