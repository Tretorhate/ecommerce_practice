import { Component, Input } from '@angular/core';
import { CartCardComponent } from '../../shared/common-ui/cart-card/cart-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CartCardComponent, CommonModule],
  templateUrl: './cart-sidebar.component.html',
})
export class CartSidebarComponent {
  @Input() products: any[] = [];
  isOpen = false;

  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  // Подсчет общего количества товаров
  getTotalQuantity(): number {
    return this.products.reduce(
      (total, product) => total + (product.quantity || 1),
      0,
    );
  }

  // Подсчет итоговой суммы
  getTotalPrice(): number {
    return this.products.reduce(
      (total, product) => total + product.price * (product.quantity || 1),
      0,
    );
  }

  // Удаление продукта из корзины
  removeProduct(index: number) {
    this.products.splice(index, 1); // Удаляем продукт из массива
    this.updateTotal(); // Обновляем итоговую сумму
  }

  // Обновление итоговой суммы
  updateTotal() {
    // Этот метод вызывается при изменении количества товара
  }

  // Обработчик для кнопки "Заказать"
  order() {
    alert('Заказ оформлен!');
  }
}
