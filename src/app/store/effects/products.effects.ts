import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsActions from '../actions/products.actions';
import { ProductItem } from '../../shared/models/product-item.model';
import { ProductService } from '../../shared/services/product.service';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(({ category, searchTerm }) =>
        this.productService.getProducts({ category, searchTerm }).pipe(
          map((products: ProductItem[]) =>
            ProductsActions.loadProductsSuccess({ products }),
          ),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProduct),
      mergeMap(({ id }) =>
        this.productService.getProduct(id).pipe(
          map((product: ProductItem) =>
            ProductsActions.loadProductSuccess({ product }),
          ),
          catchError((error) =>
            of(ProductsActions.loadProductFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
