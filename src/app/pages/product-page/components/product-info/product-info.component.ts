import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../shared/services/cart/cart.service';
import {
  StoreService,
  StoreFilter,
} from '../../../../shared/services/store.service';
import { Store } from '@ngrx/store';
import { ProductItem } from '../../../../shared/models/product-item.model';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
import * as CartActions from '../../../../store/actions/cart.actions';
import * as ProductsActions from '../../../../store/actions/products.actions';
import { CartSidebarService } from '../../../../shared/services/cart-sidebar.service';
import {
  selectProductById,
  selectProductsLoading,
} from '../../../../store/selectors/products.selectors';
import { Observable, map, filter, take, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-info',
  standalone: true,
  templateUrl: './product-info.component.html',
  imports: [CommonModule, FormsModule],
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  product = {
    id: '',
    title: '',
    price: 0,
    installmentPrice: 0,
    installmentCount: 3,
    image: '',
    thumbnailImages: [] as string[],
  };

  stores: StoreFilter[] = [];
  selectedStoreId: string | null = null;
  isFavorite = false;
  productData$!: Observable<ProductItem | undefined>;
  loading$!: Observable<boolean>;
  productId: string | null = null;

  private destroy$ = new Subject<void>();
  private readonly favoriteService = inject(FavoritesService);

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private store: Store,
    private cartSidebarService: CartSidebarService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) return;

    this.productId = productId;

    this.productData$ = this.store.select(selectProductById(productId));
    this.loading$ = this.store.select(selectProductsLoading);

    this.productData$.pipe(take(1)).subscribe((product) => {
      if (!product) {
        // Product not in store, dispatch action to load it
        this.store.dispatch(ProductsActions.loadProduct({ id: productId }));
      }
    });

    this.productData$
      .pipe(
        filter(Boolean), // Only emit when product exists
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.updateProductDisplay(data);
      });

    this.loadStores();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateProductDisplay(data: ProductItem): void {
    this.product = {
      id: data.id,
      title: data.title,
      price: data.price,
      installmentPrice: Math.round(data.price / 3),
      installmentCount: 3,
      image: data.images[0],
      thumbnailImages: data.images,
    };

    this.favoriteService
      .checkFavoriteStatus(data)
      .pipe(take(1))
      .subscribe((isFavorite) => {
        this.isFavorite = isFavorite;
      });
  }

  changeMainImage(imageUrl: string): void {
    this.product.image = imageUrl;
  }

  loadStores(): void {
    if (!this.productId) return;

    this.storeService
      .getStoresForProduct(this.productId)
      .subscribe((stores) => {
        this.stores = stores;
        this.selectedStoreId = stores[0]?.id || null;
      });
  }

  addToCart(): void {
    this.productData$.pipe(take(1)).subscribe((productData) => {
      if (!productData) {
        alert('Данные продукта не загружены.');
        return;
      }

      if (!this.selectedStoreId) {
        alert('Пожалуйста, выберите магазин.');
        return;
      }

      const cartItem = this.cartService.createCartItemFromProduct(
        productData,
        1
      );

      cartItem.storeId = this.selectedStoreId;
      const selectedStore = this.stores.find(
        (store) => store.id === this.selectedStoreId
      );
      cartItem.storeTitle = selectedStore?.title || 'Неизвестный магазин';

      this.store.dispatch(CartActions.addToCart({ item: cartItem }));

      this.cartSidebarService.openSidebar();
    });
  }

  toggleFavorite(): void {
    this.productData$.pipe(take(1)).subscribe((productData) => {
      if (productData) {
        this.favoriteService
          .toggleFavoriteWithStoreUpdate(productData, this.isFavorite)
          .subscribe({
            next: (newStatus) => {
              this.isFavorite = newStatus;
            },
            error: (err) =>
              console.error('Ошибка при переключении избранного', err),
          });
      }
    });
  }
}
