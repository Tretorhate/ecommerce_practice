import { Component, inject, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../../shared/services/product-review/product-review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductItem } from '../../../../shared/models/product-item.model';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
import * as CartActions from '../../../../store/actions/cart.actions';
import { CartSidebarService } from '../../../../shared/services/cart-sidebar.service';
import { ProductService } from '../../../../shared/services/product.service';
import { CartService } from '../../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  imports: [CommonModule, FormsModule],
})
export class ProductInfoComponent implements OnInit {
  product!: ProductItem;
  isFavorite = false;
  selectedMainImage: string = '';

  get installmentPrice(): number {
    return Math.round(this.product.price / 3);
  }

  get installmentCount(): number {
    return 3;
  }

  constructor(
    private productReviewService: ProductReviewService,
    private route: ActivatedRoute,
    private store: Store,
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private cartSidebarService: CartSidebarService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProduct(productId).subscribe({
          next: (product) => {
            this.product = product;
            // Set the first image as the main image
            this.selectedMainImage = this.product?.images?.[0] || '';
          },
          error: (error) => {
            console.error('Error loading product:', error);
          },
        });
      }
    });
  }

  changeMainImage(imageUrl: string) {
    this.selectedMainImage = imageUrl;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    console.error('Image failed to load:', target.src);
    if (target) {
      target.style.display = 'none';
    }
  }

  toggleFavorite() {
    this.favoritesService.toggleFavorite(this.product.id).subscribe(() => {
      this.isFavorite = !this.isFavorite;
    });
  }

  addToCart(productId: string) {
    const cartItem = this.cartService.createCartItemFromProduct(
      this.product,
      1
    );
    this.store.dispatch(CartActions.addToCart({ item: cartItem }));
    this.cartSidebarService.openSidebar();
  }

  get mainImage(): string {
    return this.selectedMainImage || this.product?.images?.[0] || '';
  }

  get thumbnailImages(): string[] {
    return this.product?.images || [];
  }
}
