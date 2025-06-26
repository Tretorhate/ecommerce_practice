import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductReviewService } from '../../../../shared/services/product-review/product-review.service';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';

@Component({
  selector: 'app-product-info',
  standalone: true,
  templateUrl: './product-info.component.html',
  imports: [CommonModule, FormsModule],
})
export class ProductInfoComponent implements OnInit {
  product = {
    id: '',
    title: '',
    price: 0,
    installmentPrice: 0,
    installmentCount: 3,
    image: '',
    thumbnailImages: [] as string[],
  };

  stores: { id: string; title: string }[] = [];
  selectedStoreId: string | null = null;
  isFavorite = false;

  private readonly favoriteService = inject(FavoritesService);

  constructor(
    private productReviewService: ProductReviewService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productReviewService.fetchProductById(productId).subscribe((data) => {
        this.product = {
          id: data.id,
          title: data.title,
          price: data.price,
          installmentPrice: Math.round(data.price / 3),
          installmentCount: 3,
          image: data.images[0],
          thumbnailImages: data.images,
        };

        this.checkIfFavorite();
      });
    }

    this.loadStores();
  }

  changeMainImage(imageUrl: string): void {
    this.product.image = imageUrl;
  }

  loadStores(): void {
    this.cartService.getStores().subscribe((stores) => {
      this.stores = stores;
      this.selectedStoreId = stores[0]?.id || null;
    });
  }

  addToCart(productId: string): void {
    if (!this.selectedStoreId) {
      alert('Пожалуйста, выберите магазин.');
      return;
    }

    this.cartService.addToCart(productId, this.selectedStoreId);
  }

  toggleFavorite(): void {
    this.favoriteService.toggleFavorite(this.product.id).subscribe({
      next: () => (this.isFavorite = !this.isFavorite),
      error: (err) => console.error('Ошибка при переключении избранного', err),
    });
  }

  checkIfFavorite(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (favorites) => {
        this.isFavorite = favorites.some((fav: any) => fav.id === this.product.id);
      },
      error: (err) => console.error('Ошибка при получении избранного', err),
    });
  }
}
