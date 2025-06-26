import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductItem } from '../../shared/models/product-item.model';
import { Category } from '../../shared/models/category.model';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith, filter, distinctUntilChanged } from 'rxjs/operators';
import { selectProducts } from '../../store/selectors/products.selectors';
import { loadProducts } from '../../store/actions/products.actions';
import { CategoryService } from '../../shared/services/category.service';
import { StoreService, StoreFilter } from '../../shared/services/store.service';
import { ProductFilterService } from '../../shared/services/product-filter.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    FormsModule,
    CategoryFilterComponent,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  // Filter state as BehaviorSubjects for reactivity
  private selectedCategorySubject = new BehaviorSubject<string | null>(null);
  private minPriceSubject = new BehaviorSubject<number | null>(null);
  private maxPriceSubject = new BehaviorSubject<number | null>(null);
  private selectedStoresSubject = new BehaviorSubject<string[]>([]);
  private selectedRatingsSubject = new BehaviorSubject<number[]>([]);
  private searchTermSubject = new BehaviorSubject<string | null>(null);

  // Public observables for template
  selectedCategory$ = this.selectedCategorySubject.asObservable();
  minPrice$ = this.minPriceSubject.asObservable();
  maxPrice$ = this.maxPriceSubject.asObservable();
  selectedStores$ = this.selectedStoresSubject.asObservable();
  selectedRatings$ = this.selectedRatingsSubject.asObservable();
  searchTerm$ = this.searchTermSubject.asObservable();

  // Getters for current values
  get selectedCategory(): string | null {
    return this.selectedCategorySubject.value;
  }

  get minPrice(): number | null {
    return this.minPriceSubject.value;
  }

  get maxPrice(): number | null {
    return this.maxPriceSubject.value;
  }

  get selectedStores(): string[] {
    return this.selectedStoresSubject.value;
  }

  get selectedRatings(): number[] {
    return this.selectedRatingsSubject.value;
  }

  products$: Observable<ProductItem[]>;
  categories$: Observable<Category[]>;
  stores$: Observable<StoreFilter[]>;
  filteredProducts$: Observable<ProductItem[]>;

  // Available rating options
  ratingOptions = [
    { value: 5, label: '5 звезд' },
    { value: 4, label: '4+ звезды' },
    { value: 3, label: '3+ звезды' },
    { value: 2, label: '2+ звезды' },
    { value: 1, label: '1+ звезда' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private categoryService: CategoryService,
    private storeService: StoreService,
    private productFilterService: ProductFilterService
  ) {
    this.products$ = this.store.select(selectProducts);
    this.categories$ = this.categoryService.getCategories();
    this.stores$ = this.storeService.getStores();

    // Create reactive filtered products observable
    this.filteredProducts$ = combineLatest([
      this.products$,
      this.categories$,
      this.selectedCategory$,
      this.minPrice$,
      this.maxPrice$,
      this.selectedStores$,
      this.selectedRatings$,
      this.searchTerm$,
    ]).pipe(
      map(
        ([
          products,
          categories,
          selectedCategory,
          minP,
          maxP,
          stores,
          ratings,
          term,
        ]) =>
          this.productFilterService.filter(products, {
            categoryId: selectedCategory,
            minPrice: minP,
            maxPrice: maxP,
            storeIds: stores,
            ratingThresholds: ratings,
            searchTerm: term,
            categories,
          })
      )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts({}));
    // Listen to route param and query param changes
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');
      this.selectedCategorySubject.next(category);
      this.updateFiltersFromRoute();
    });
    this.route.queryParamMap.subscribe(() => {
      this.updateFiltersFromRoute();
    });
  }

  updateFiltersFromRoute() {
    // Read query params for filters
    const queryParams = this.route.snapshot.queryParamMap;
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    const stores = queryParams.get('stores');
    const ratings = queryParams.get('ratings');
    const searchTerm = queryParams.get('searchTerm');
    const category = queryParams.get('category');

    this.minPriceSubject.next(minPrice ? +minPrice : null);
    this.maxPriceSubject.next(maxPrice ? +maxPrice : null);
    this.selectedStoresSubject.next(stores ? stores.split(',') : []);
    this.selectedRatingsSubject.next(
      ratings ? ratings.split(',').map((r) => +r) : []
    );
    this.searchTermSubject.next(searchTerm);
    this.selectedCategorySubject.next(category);
  }

  trackByProductId(index: number, product: ProductItem) {
    return product.id;
  }

  updateRouteWithFilters() {
    const queryParams: Record<string, any> = {
      category: this.selectedCategory ?? null,

      minPrice: this.minPrice != null ? this.minPrice : null,
      maxPrice: this.maxPrice != null ? this.maxPrice : null,

      stores:
        this.selectedStores.length > 0
          ? this.selectedStores.join(',')
          : null,
      ratings:
        this.selectedRatings.length > 0
          ? this.selectedRatings.join(',')
          : null,

      searchTerm: this.searchTermSubject.value || null,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  resetFilters() {
    this.selectedCategorySubject.next(null);
    this.minPriceSubject.next(null);
    this.maxPriceSubject.next(null);
    this.selectedStoresSubject.next([]);
    this.selectedRatingsSubject.next([]);
    this.router.navigate(['/category']);
  }

  onCategorySelected(categoryId: string | null) {
    this.selectedCategorySubject.next(categoryId);
    const queryParams: any = { ...this.route.snapshot.queryParams };
    if (categoryId) {
      queryParams.category = categoryId;
    } else {
      delete queryParams.category;
    }

    this.router.navigate(['/category'], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onPriceChange() {
    this.updateRouteWithFilters();
  }

  onMinPriceChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value ? +target.value : null;
    this.minPriceSubject.next(value);
    this.updateRouteWithFilters();
  }

  onMaxPriceChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value ? +target.value : null;
    this.maxPriceSubject.next(value);
    this.updateRouteWithFilters();
  }

  onStoreChange(event: Event, storeId: string) {
    const target = event.target as HTMLInputElement;
    const currentStores = this.selectedStoresSubject.value;

    if (target.checked) {
      this.selectedStoresSubject.next([...currentStores, storeId]);
    } else {
      this.selectedStoresSubject.next(
        currentStores.filter((id) => id !== storeId)
      );
    }
    this.updateRouteWithFilters();
  }

  onRatingChange(event: Event, rating: number) {
    const target = event.target as HTMLInputElement;
    const currentRatings = this.selectedRatingsSubject.value;

    if (target.checked) {
      this.selectedRatingsSubject.next([...currentRatings, rating]);
    } else {
      this.selectedRatingsSubject.next(
        currentRatings.filter((r) => r !== rating)
      );
    }
    this.updateRouteWithFilters();
  }

  isStoreSelected(storeId: string): boolean {
    return this.selectedStores.includes(storeId);
  }

  isRatingSelected(rating: number): boolean {
    return this.selectedRatings.includes(rating);
  }
}
