import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductItem } from '../../shared/models/product-item.model';
import { Category } from '../../shared/models/category.model';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { selectProducts } from '../../store/selectors/products.selectors';
import { loadProducts } from '../../store/actions/products.actions';
import { CategoryService } from '../../shared/services/category.service';
import { StoreService, StoreFilter } from '../../shared/services/store.service';

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
  selectedCategory: string | null = null;

  minPrice: number | null = null;
  maxPrice: number | null = null;

  selectedStores: string[] = [];
  selectedRatings: number[] = [];

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
    private storeService: StoreService
  ) {
    this.products$ = this.store.select(selectProducts);
    this.categories$ = this.categoryService.getCategories();
    this.stores$ = this.storeService.getStores();

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
    const stores = queryParams.get('stores');
    const ratings = queryParams.get('ratings');

    this.minPrice = minPrice ? +minPrice : null;
    this.maxPrice = maxPrice ? +maxPrice : null;
    this.selectedStores = stores ? stores.split(',') : [];
    this.selectedRatings = ratings ? ratings.split(',').map((r) => +r) : [];
  }

  // Helper method to get all descendant category IDs (including the category itself)
  private getCategoryAndDescendants(
    categoryId: string,
    categories: Category[]
  ): string[] {
    const result: string[] = [categoryId];

    const findCategory = (
      cats: Category[],
      targetId: string
    ): Category | null => {
      for (const cat of cats) {
        if (cat.id === targetId) {
          return cat;
        }
        if (cat.children) {
          const found = findCategory(cat.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };

    const category = findCategory(categories, categoryId);
    if (category && category.children) {
      for (const child of category.children) {
        result.push(...this.getCategoryAndDescendants(child.id, categories));
      }
    }

    return result;
  }

  // Helper method to calculate product rating
  private calculateProductRating(product: ProductItem): number {
    if (!product.reviews || product.reviews.length === 0) {
      return 0;
    }
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return Math.round(totalRating / product.reviews.length);
  }

  updateFilteredProducts() {
    this.filteredProducts$ = combineLatest([
      this.products$,
      this.categories$,
      of(this.selectedCategory),
      of(this.minPrice),
      of(this.maxPrice),
      of(this.selectedStores),
      of(this.selectedRatings),
    ]).pipe(
      map(
        ([
          products,
          categories,
          selectedCategory,
          minPrice,
          maxPrice,
          selectedStores,
          selectedRatings,
        ]) => {
          return products.filter((p) => {
            let matchCategory = true;

            if (selectedCategory) {
              const allowedCategoryIds = this.getCategoryAndDescendants(
                selectedCategory,
                categories
              );

              matchCategory = allowedCategoryIds.includes(p.categoryId);

              if (!matchCategory) {
                const selectedCategoryObj = this.findCategoryById(
                  selectedCategory,
                  categories
                );
                if (selectedCategoryObj) {
                  if (p.category?.title === selectedCategoryObj.title) {
                    matchCategory = true;
                  } else {
                    const descendantTitles =
                      this.getCategoryAndDescendantTitles(
                        selectedCategoryObj,
                        categories
                      );
                    matchCategory = descendantTitles.includes(
                      p.category?.title || ''
                    );
                  }
                }
              }
            }

            const matchPriceMin = minPrice != null ? p.price >= minPrice : true;
            const matchPriceMax = maxPrice != null ? p.price <= maxPrice : true;

            const matchStore =
              selectedStores.length === 0 || selectedStores.includes(p.storeId);

            const productRating = this.calculateProductRating(p);
            const matchRating =
              selectedRatings.length === 0 ||
              selectedRatings.some((rating) => productRating >= rating);

            return (
              matchCategory &&
              matchPriceMin &&
              matchPriceMax &&
              matchStore &&
              matchRating
            );
          });
        }
      )
    );
  }

  private findCategoryById(
    categoryId: string,
    categories: Category[]
  ): Category | null {
    for (const cat of categories) {
      if (cat.id === categoryId) {
        return cat;
      }
      if (cat.children) {
        const found = this.findCategoryById(categoryId, cat.children);
        if (found) return found;
      }
    }
    return null;
  }

  private getCategoryAndDescendantTitles(
    category: Category,
    allCategories: Category[]
  ): string[] {
    const result: string[] = [category.title];

    if (category.children) {
      for (const child of category.children) {
        result.push(child.title);
        result.push(
          ...this.getCategoryAndDescendantTitles(child, allCategories)
        );
      }
    }

    return result;
  }

  trackByProductId(index: number, product: ProductItem) {
    return product.id;
  }

  updateRouteWithFilters() {
    const queryParams: any = {};
    if (this.minPrice != null) queryParams.minPrice = this.minPrice;
    if (this.maxPrice != null) queryParams.maxPrice = this.maxPrice;
    if (this.selectedStores.length > 0)
      queryParams.stores = this.selectedStores.join(',');
    if (this.selectedRatings.length > 0)
      queryParams.ratings = this.selectedRatings.join(',');

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  resetFilters() {
    this.selectedCategory = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedStores = [];
    this.selectedRatings = [];
    this.updateFilteredProducts();
    this.router.navigate(['/category']);
  }

  onCategorySelected(categoryId: string) {
    this.selectedCategory = categoryId;
    this.updateRouteWithFilters();
    this.updateFilteredProducts();
  }

  onPriceChange() {
    this.updateRouteWithFilters();
    this.updateFilteredProducts();
  }

  onStoreChange(event: Event, storeId: string) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedStores.push(storeId);
    } else {
      this.selectedStores = this.selectedStores.filter((id) => id !== storeId);
    }
    this.updateRouteWithFilters();
    this.updateFilteredProducts();
  }

  onRatingChange(event: Event, rating: number) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedRatings.push(rating);
    } else {
      this.selectedRatings = this.selectedRatings.filter((r) => r !== rating);
    }
    this.updateRouteWithFilters();
    this.updateFilteredProducts();
  }

  isStoreSelected(storeId: string): boolean {
    return this.selectedStores.includes(storeId);
  }

  isRatingSelected(rating: number): boolean {
    return this.selectedRatings.includes(rating);
  }
}
