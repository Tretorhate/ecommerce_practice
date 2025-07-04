import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProducts } from '../../store/selectors/products.selectors';
import { ProductItem } from '../models/product-item.model';

export interface StoreFilter {
  id: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store) {}

  getStores(): Observable<StoreFilter[]> {
    return this.store.select(selectProducts).pipe(
      map((products: ProductItem[]) => {
        const storeMap = new Map<string, StoreFilter>();

        products.forEach((product) => {
          if (product.store && !storeMap.has(product.store.id)) {
            storeMap.set(product.store.id, {
              id: product.store.id,
              title: product.store.title,
            });
          }
        });

        return Array.from(storeMap.values()).sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      })
    );
  }

  getStoresForProduct(productId: string): Observable<StoreFilter[]> {
    return this.store.select(selectProducts).pipe(
      map((products: ProductItem[]) => {
        const product = products.find(p => p.id === productId);
        if (!product || !product.store) {
          return [];
        }
        
        return [{
          id: product.store.id,
          title: product.store.title,
        }];
      })
    );
  }
}
