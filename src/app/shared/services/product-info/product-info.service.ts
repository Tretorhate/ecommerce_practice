import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models/review.model';
@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);

  private readonly reviews$ = new BehaviorSubject<Review[]>([]);
  private readonly reviewsLoaded$ = new BehaviorSubject<boolean>(false);

  private getProductId(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }

  fetchReviews(): Observable<Review[]> {
    const productId = this.getProductId();

    return this.http.get<Review[]>(`/reviews/${productId}`).pipe(
      tap((reviews) => {
        this.reviews$.next(reviews);
        this.reviewsLoaded$.next(true);
      })
    );
  }

  postReview(data: { text: string; rating: number }): Observable<any> {
    const productId = this.getProductId();

    return this.http.post(`/reviews/${productId}`, data).pipe(
      tap(() => {
    
        this.fetchReviews().subscribe();
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
