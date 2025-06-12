import { Component } from '@angular/core';
import { CategoryMenuComponent } from '../../shared/common-ui/category-menu/category-menu.component';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-header',
  imports: [CategoryMenuComponent, CartSidebarComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  products = [
    {
      name: 'Apple 18W USB-C Power Adapter USB Type-C белый',
      price: 6900,
      image:
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MU7T2?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1542404784163',
      quantity: 1,
    },
    {
      name: 'Xiaomi Mi Power Bank 3 10000mAh',
      price: 11900,
      image: 'https://s.a-5.ru/i/file/161/7/64/37/643771dda7708123.jpg',
      quantity: 1,
    },
    {
      name: 'Samsung Galaxy Buds2 Pro Graphite',
      price: 54900,
      image:
        'https://appmistore.ru/upload/iblock/b91/zbqxiyzgss4apa3no1ofmc27ev90v6rk.webp',
      quantity: 1,
    },
    {
      name: 'Xiaomi Mi Power Bank 3 10000mAh',
      price: 11900,
      image: 'https://s.a-5.ru/i/file/161/7/64/37/643771dda7708123.jpg',
      quantity: 1,
    },
    {
      name: 'Samsung Galaxy Buds2 Pro Graphite',
      price: 54900,
      image:
        'https://appmistore.ru/upload/iblock/b91/zbqxiyzgss4apa3no1ofmc27ev90v6rk.webp',
      quantity: 1,
    },
    {
      name: 'Xiaomi Mi Power Bank 3 10000mAh',
      price: 11900,
      image: 'https://s.a-5.ru/i/file/161/7/64/37/643771dda7708123.jpg',
      quantity: 1,
    },
    {
      name: 'Samsung Galaxy Buds2 Pro Graphite',
      price: 54900,
      image:
        'https://appmistore.ru/upload/iblock/b91/zbqxiyzgss4apa3no1ofmc27ev90v6rk.webp',
      quantity: 1,
    },
  ];
}
