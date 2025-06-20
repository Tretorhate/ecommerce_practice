import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductItem } from '../../models/product-item.model';
import { OrderItem } from '../../models/order-item.model';
import * as CartActions from '../../../store/actions/cart.actions';
import * as CartSelectors from '../../../store/selectors/cart.selectors';
import { CartService } from '../../services/cart.service';
import { CartSidebarService } from '../../services/cart-sidebar.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductItem;
  @Input() showAddToCart: boolean = false;

  stars = Array.from({ length: 5 });
  isFavorite = false;
  cartItem$!: Observable<OrderItem | undefined>;

  constructor(
    private store: Store,
    private cartService: CartService,
    private cartSidebarService: CartSidebarService
  ) {}

  ngOnInit() {
    this.cartItem$ = this.store.select(
      CartSelectors.selectCartItemById(this.product.id)
    );
  }

  get productImage(): string {
    const imageUrl = this.product.images?.[0] || '';
    if (!imageUrl) return '';

    // If the image URL is already absolute, return it as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    // If it's a relative path, add the base URL
    return `https://practiceapi.mooo.com${imageUrl}`;
  }

  get rating(): number {
    if (!this.product.reviews || this.product.reviews.length === 0) {
      return 0;
    }
    const totalRating = this.product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return Math.round(totalRating / this.product.reviews.length);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  addToCart() {
    const cartItem = this.cartService.createCartItemFromProduct(this.product);
    this.store.dispatch(CartActions.addToCart({ item: cartItem }));
    this.cartSidebarService.openSidebar();
  }

  incrementQuantity() {
    this.store.dispatch(
      CartActions.updateCartItemQuantity({
        itemId: this.product.id,
        quantity: 1,
      })
    );
  }

  decrementQuantity() {
    this.store.dispatch(
      CartActions.updateCartItemQuantity({
        itemId: this.product.id,
        quantity: -1,
      })
    );
  }
}
