import { Component, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../../shared/services/product-review/product-review.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductItem } from '../../../../shared/models/product-item.model';
import { OrderItem } from '../../../../shared/models/order-item.model';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  imports: [CommonModule],
})
export class ProductInfoComponent implements OnInit {
  product: ProductItem = {
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
    private cartService: CartService
  ) {}

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
          this.product.image = data.images?.[0] || '';
          this.product.thumbnailImages = data.images || [];
        });
    }
  }

  changeMainImage(imageUrl: string) {
    this.product.image = imageUrl;
  }

  addToCart(productId: string) {
    const orderItem: OrderItem = {
      id: this.product.id,
      quantity: 1,
      price: this.product.price,
      total: this.product.price,
      product: {
        id: this.product.id,
        title: this.product.title || this.product.name || '',
        category: this.product.category,
      },
      storeId: '', // Set appropriately if available
    };
    this.cartService.addItem(orderItem).subscribe();
  }
  isFavorite = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
