import { Component, inject, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../../shared/services/product-review/product-review.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  imports: [CommonModule, FormsModule],
})
export class ProductInfoComponent implements OnInit {
  product: {
    id: string;
    title: string;
    price: number;
    installmentPrice: number;
    installmentCount: number;
    image: string;
    thumbnailImages: string[];
  } = {
    id: '',
    title: '',
    price: 0,
    installmentPrice: 0,
    installmentCount: 3,
    image: '',
    thumbnailImages: [],
  };

  constructor(
    private productReviewService: ProductReviewService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {}

  private favoriteService = inject(FavoritesService);
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id') || '';
    if (productId) {
      this.productReviewService
        .fetchProductById(productId)
        .subscribe((data) => {
          this.product.id = data.id;
          this.product.title = data.title;
          this.product.price = data.price;
          this.product.installmentPrice = Math.round(data.price / 3);
          this.product.image = data.images[0];
          this.product.thumbnailImages = data.images;
        });
    }

    this.getStores();
  }

  changeMainImage(imageUrl: string) {
    this.product.image = imageUrl;
  }
  stores: { id: string; title: string }[] = [];
  selectedStoreId: string | null = null;
  getStores() {
    this.cartService.getStores().subscribe((stores) => {
      this.stores = stores;
      if (stores.length > 0) {
        this.selectedStoreId = stores[0].id;
      }
    });
  }
  selectStore(storeId: string) {
    this.selectedStoreId = storeId;
  }

  addToCart(productId: string) {
    if (this.selectedStoreId) {
      this.cartService.addToCart(productId, this.selectedStoreId);
    } else {
      alert('Пожалуйста, выберите магазин.');
    }
  }
  isFavorite = false;

  toggleFavorite() {
    this.favoriteService.toggleFavorite(this.product.id);
  }
}
