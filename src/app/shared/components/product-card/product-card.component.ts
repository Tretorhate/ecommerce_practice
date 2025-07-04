import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FavoritesService } from '../../../shared/services/favorites/favorites.service';
import { ProductItem } from '../../models/product-item.model';
import { OrderItem } from '../../models/order-item.model';
import { CartService } from '../../services/cart/cart.service';
import { selectCartItems } from '../../../store/selectors/cart.selectors';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductItem;
  @Input() showAddToCart: boolean = true;

  stars = Array.from({ length: 5 });
  isFav: boolean = false;
  cartItem$!: Observable<OrderItem | undefined>;

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Use centralized favorite status check
    this.favoritesService
      .checkFavoriteStatus(this.product)
      .pipe(take(1))
      .subscribe((isFavorite) => {
        this.isFav = isFavorite;
      });

    // Set up cart item observable - read from store
    this.cartItem$ = this.store
      .select(selectCartItems)
      .pipe(
        map((items: OrderItem[]) =>
          items.find((item) => item.productId === this.product.id)
        )
      );
  }

  get rating(): number {
    if (!this.product.reviews || this.product.reviews.length === 0) {
      return 0;
    }
    const totalRating = this.product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / this.product.reviews.length;
  }

  get productImage(): string {
    return (
      this.product.images?.[0] ||
      '/assets/images/categories/landscape-placeholder.svg'
    );
  }

  toggleFavorite(): void {
    this.favoritesService
      .toggleFavoriteWithStoreUpdate(this.product, this.isFav)
      .subscribe({
        next: (newStatus) => {
          this.isFav = newStatus;
        },
        error: (error: any) => {
          console.error('Ошибка избранного:', error);
        },
      });
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '/assets/images/categories/landscape-placeholder.svg';
  }

  addToCart(): void {
    this.cartService.addProductToCart(this.product, 1);
  }

  incrementQuantity(): void {
    this.cartItem$.pipe(take(1)).subscribe((cartItem) => {
      if (cartItem) {
        this.cartService.incrementCartItemQuantity(cartItem.id);
      }
    });
  }

  decrementQuantity(): void {
    this.cartItem$.pipe(take(1)).subscribe((cartItem) => {
      if (cartItem) {
        this.cartService.decrementCartItemQuantity(cartItem.id);
      }
    });
  }
}
