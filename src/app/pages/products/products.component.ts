import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductItem } from '../../shared/models/product-item.model';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { selectProducts } from '../../store/selectors/products.selectors';
import { loadProducts } from '../../store/actions/products.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CategoryFilterComponent,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  selectedCategory: string | null = null;

  minPrice: number | null = null;
  maxPrice: number | null = null;

  brandOptions = [
    'Apple',
    'Samsung',
    'Xiaomi',
    'Generic',
    'LG',
    'JBL',
    'Philips',
  ];
  sellerOptions = [
    'Apple Store',
    'Samsung Official',
    'Mi Shop',
    'Case Shop',
    'LG Store',
    'ElectroWorld',
  ];

  selectedBrands = new Set<string>();
  selectedSellers = new Set<string>();

  private readonly categoryHierarchy: Record<string, string[]> = {
    phones: [
      'smartphones',
      'accessories',
      'iphone',
      'android',
      'chargers',
      'cases',
    ],
    smartphones: ['iphone', 'android'],
    accessories: ['chargers', 'cases'],
    appliances: ['large', 'small'],
    tv: ['tv-sets', 'audio'],
  };

  placeholderProducts: ProductItem[] = [
    {
      id: 'p1',
      name: 'iPhone 14 Pro 128GB',
      price: 999,
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
      category: 'iphone',
      brand: 'Apple',
      seller: 'Apple Store',
    },
    {
      id: 'p2',
      name: 'Samsung Galaxy S23',
      price: 899,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center',
      category: 'android',
      brand: 'Samsung',
      seller: 'Samsung Official',
    },
    {
      id: 'p3',
      name: 'Xiaomi Mi 13',
      price: 699,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop&crop=center',
      category: 'android',
      brand: 'Xiaomi',
      seller: 'Mi Shop',
    },
    {
      id: 'p4',
      name: 'Apple MagSafe Charger',
      price: 39,
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop&crop=center',
      category: 'chargers',
      brand: 'Apple',
      seller: 'Apple Store',
    },
    {
      id: 'p5',
      name: 'Silicone Case for iPhone 14',
      price: 29,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&crop=center',
      category: 'cases',
      brand: 'Generic',
      seller: 'Case Shop',
    },
    {
      id: 'p6',
      name: 'LG OLED TV 55"',
      price: 1599,
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&crop=center',
      category: 'tv-sets',
      brand: 'LG',
      seller: 'LG Store',
    },
    {
      id: 'p7',
      name: 'JBL Flip 6 Bluetooth Speaker',
      price: 129,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center',
      category: 'audio',
      brand: 'JBL',
      seller: 'ElectroWorld',
    },
    {
      id: 'p8',
      name: 'Samsung Double Door Refrigerator',
      price: 899,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop&crop=center',
      category: 'large',
      brand: 'Samsung',
      seller: 'Samsung Official',
    },
    {
      id: 'p9',
      name: 'Philips Steam Iron',
      price: 59,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
      category: 'small',
      brand: 'Philips',
      seller: 'ElectroWorld',
    },
  ];

  products$: Observable<ProductItem[]>;

  filteredProducts$: Observable<ProductItem[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.products$ = this.store.select(selectProducts).pipe(
      map((storeProducts) => {
        // If storeProducts is empty, return placeholder
        if (!storeProducts || storeProducts.length === 0) {
          return this.placeholderProducts;
        }
        // Union: store products + placeholder products not in store
        const storeIds = new Set(storeProducts.map((p) => p.id));
        const merged = [
          ...storeProducts,
          ...this.placeholderProducts.filter((p) => !storeIds.has(p.id)),
        ];
        return merged;
      })
    );

    // Filtered products observable (will be set in ngOnInit)
    this.filteredProducts$ = of([]);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts({}));

    // Listen to route param and query param changes
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');
      this.selectedCategory = category;
      this.updateFiltersFromRoute();
      this.updateFilteredProducts();
    });
    this.route.queryParamMap.subscribe(() => {
      this.updateFiltersFromRoute();
      this.updateFilteredProducts();
    });
  }

  updateFiltersFromRoute() {
    // Read query params for filters
    const queryParams = this.route.snapshot.queryParamMap;
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    const brands = queryParams.getAll('brand');
    const sellers = queryParams.getAll('seller');
    this.minPrice = minPrice ? +minPrice : null;
    this.maxPrice = maxPrice ? +maxPrice : null;
    this.selectedBrands = new Set(brands);
    this.selectedSellers = new Set(sellers);
  }

  updateFilteredProducts() {
    this.filteredProducts$ = combineLatest([
      this.products$,
      of(this.selectedCategory),
      of(this.minPrice),
      of(this.maxPrice),
      of(this.selectedBrands),
      of(this.selectedSellers),
    ]).pipe(
      map(
        ([
          products,
          selectedCategory,
          minPrice,
          maxPrice,
          selectedBrands,
          selectedSellers,
        ]) => {
          return products.filter((p) => {
            let matchCategory = true;
            if (selectedCategory) {
              if (p.category === selectedCategory) {
                matchCategory = true;
              } else {
                const descendants =
                  this.categoryHierarchy[selectedCategory] || [];
                matchCategory = descendants.includes(p.category || '');
              }
            }
            const matchPriceMin = minPrice != null ? p.price >= minPrice : true;
            const matchPriceMax = maxPrice != null ? p.price <= maxPrice : true;
            const matchBrand = selectedBrands.size
              ? selectedBrands.has(p.brand || '')
              : true;
            const matchSeller = selectedSellers.size
              ? selectedSellers.has(p.seller || '')
              : true;
            return (
              matchCategory &&
              matchPriceMin &&
              matchPriceMax &&
              matchBrand &&
              matchSeller
            );
          });
        }
      )
    );
  }

  toggleBrand(brand: string, checked: boolean) {
    if (checked) {
      this.selectedBrands.add(brand);
    } else {
      this.selectedBrands.delete(brand);
    }
    this.updateRouteWithFilters();
  }

  toggleSeller(seller: string, checked: boolean) {
    if (checked) {
      this.selectedSellers.add(seller);
    } else {
      this.selectedSellers.delete(seller);
    }
    this.updateRouteWithFilters();
  }

  updateRouteWithFilters() {
    // Update the route with current filters as query params
    const queryParams: any = {};
    if (this.minPrice != null) queryParams.minPrice = this.minPrice;
    if (this.maxPrice != null) queryParams.maxPrice = this.maxPrice;
    if (this.selectedBrands.size > 0)
      queryParams.brand = Array.from(this.selectedBrands);
    if (this.selectedSellers.size > 0)
      queryParams.seller = Array.from(this.selectedSellers);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  trackByProductId(index: number, product: ProductItem) {
    return product.id;
  }

  onCategorySelected(categoryId: string) {
    this.selectedCategory = categoryId;
    this.updateRouteWithFilters();
    this.updateFilteredProducts();
  }
}
