import { Component, inject, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../../shared/services/product-review/product-review.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductItem } from '../../../../shared/models/product-item.model';
import { OrderItem } from '../../../../shared/models/order-item.model';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  imports: [CommonModule],
})
export class ProductInfoComponent implements OnInit {
  product: ProductItem = {
    id: '',
    title: '',
    description: '',
    price: 0,
    images: [],
    storeId: '',
    categoryId: '',
    createdAt: '',
    updatedAt: '',
    userId: null,
    category: {
      id: '',
      parentId: null,
      title: '',
      description: '',
    },
    reviews: [],
    store: {
      id: '',
      title: '',
      description: null,
      userId: '',
      createdAt: '',
      updatedAt: '',
    },
  };

  get installmentPrice(): number {
    return Math.round(this.product.price / 3);
  }

  get installmentCount(): number {
    return 3;
  }

  get mainImage(): string {
    return this.product.images?.[0] || '';
  }

  get thumbnailImages(): string[] {
    return this.product.images || [];
  }

  constructor(
    private productReviewService: ProductReviewService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  private favoriteService = inject(FavoritesService);
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id') || '';
    if (productId) {
      this.productReviewService
        .fetchProductById(productId)
        .subscribe((data) => {
          this.product = { ...data };
        });
    }
  }

  changeMainImage(imageUrl: string) {
    // Update the first image in the array
    if (this.product.images && this.product.images.length > 0) {
      this.product.images[0] = imageUrl;
    }
  }

  addToCart(productId: string) {
    const orderItem: OrderItem = {
      id: this.product.id,
      quantity: 1,
      price: this.product.price,
      total: this.product.price,
      product: {
        id: this.product.id,
        title: this.product.title,
        category: this.product.category?.title,
      },
      storeId: this.product.storeId,
    };
    this.cartService.addItem(orderItem).subscribe();
  }
  isFavorite = false;

  toggleFavorite() {
    this.favoriteService.toggleFavorite(this.product.id);
  }
}
