import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models/review.model';
import { ProductService } from '../product.service';
import { ProductItem } from '../../models/product-item.model';
@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  private readonly reviews$ = new BehaviorSubject<Review[]>([]);
  private readonly reviewsLoaded$ = new BehaviorSubject<boolean>(false);
  private reviewSubmitted$ = new Subject<void>();

  get reviewSubmitted() {
    return this.reviewSubmitted$.asObservable();
  }

  fetchProductById(productId: string): Observable<ProductItem> {
    return this.productService.getProduct(productId);
  }

  createReview(review: Review): Observable<Review> {
    const productId = review.product?.id || '';
    const storeId = review.store?.title || '';
    return this.http.post<Review>(`/reviews/${productId}/${storeId}`, review);
  }

  updateReview(reviewId: string, review: Review): Observable<Review> {
    return this.http.put<Review>(`/reviews/${reviewId}`, review);
  }

  getProductReviews(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`/reviews/${productId}`);
  }

  postReview(
    productId: string,
    storeId: string,
    data: { text: string; rating: number }
  ): Observable<any> {
    return this.http.post(`/reviews/${productId}/${storeId}`, data).pipe(
      tap(() => {
        this.fetchReviews(productId).subscribe();
        this.reviewSubmitted$.next();
      })
    );
  }

  fetchReviews(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`/reviews/${productId}`).pipe(
      tap((reviews) => {
        this.reviews$.next(reviews);
        this.reviewsLoaded$.next(true);
      })
    );
  }
  getReviewsStream(): Observable<Review[]> {
    return this.reviews$.asObservable();
  }

  areReviewsLoaded(): Observable<boolean> {
    return this.reviewsLoaded$.asObservable();
  }
}
