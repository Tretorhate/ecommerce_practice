import { Injectable } from '@angular/core';
import { ProductItem } from '../models/product-item.model';
import { Category } from '../models/category.model';

export interface ProductFilterParams {
  categoryId?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  storeIds?: string[];
  ratingThresholds?: number[];
  searchTerm?: string | null;
  categories?: Category[]; // needed for tree look-ups
}

@Injectable({ providedIn: 'root' })
export class ProductFilterService {
  filter(products: ProductItem[], params: ProductFilterParams): ProductItem[] {
    const {
      categoryId,
      minPrice,
      maxPrice,
      storeIds = [],
      ratingThresholds = [],
      searchTerm,
      categories = [],
    } = params;

    return products.filter((p) => {
      const matchCategory =
        !categoryId || categoryId === 'null' || categoryId === 'undefined'
          ? true
          : this.belongsToCategoryTree(p, categoryId, categories);

      const matchPriceMin = minPrice == null || p.price >= minPrice;
      const matchPriceMax = maxPrice == null || p.price <= maxPrice;
      const matchStore = storeIds.length === 0 || storeIds.includes(p.storeId);
      const matchRating =
        ratingThresholds.length === 0 ||
        ratingThresholds.some((r) => this.rating(p) >= r);
      const matchSearch =
        !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchCategory &&
        matchPriceMin &&
        matchPriceMax &&
        matchStore &&
        matchRating &&
        matchSearch
      );
    });
  }

  /* ---- private helpers ---- */
  private rating(p: ProductItem): number {
    if (!p.reviews?.length) return 0;
    const sum = p.reviews.reduce((s, r) => s + r.rating, 0);
    return Math.round(sum / p.reviews.length);
  }

  private belongsToCategoryTree(
    product: ProductItem,
    targetId: string,
    categories: Category[]
  ): boolean {
    const ids = this.collectDescendantIds(targetId, categories);
    return ids.includes(product.categoryId);
  }

  private collectDescendantIds(id: string, cats: Category[]): string[] {
    const out: string[] = [id];
    const cat = this.find(cats, id);
    cat?.children?.forEach((c) =>
      out.push(...this.collectDescendantIds(c.id, cats))
    );
    return out;
  }

  private find(cats: Category[], id: string): Category | undefined {
    for (const c of cats) {
      if (c.id === id) return c;
      const found = c.children && this.find(c.children, id);
      if (found) return found;
    }
    return undefined;
  }
}
