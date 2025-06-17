import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

   transform(value: 'PENDING' | 'PAYED'): string {
    switch (value) {
      case 'PAYED':
        return 'Оплачен';
      case 'PENDING':
        return 'В ожидании';
      default:
        return value;
    }
  }
}
