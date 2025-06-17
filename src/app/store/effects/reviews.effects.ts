import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ReviewsActions from '../actions/reviews.actions';
import { ProductReviewService } from '../../shared/services/product-review/product-review.service';
import { Router } from '@angular/router';

@Injectable()
export class ReviewsEffects {
  private actions$ = inject(Actions);
  private reviewService = inject(ProductReviewService);
  private router = inject(Router);

  createReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewsActions.createReview),
      mergeMap(({ review }) => {
        if (!review.text || review.text.length < 10) {
          return of(
            ReviewsActions.createReviewFailure({
              error: {
                status: 400,
                statusText: 'Review must be at least 10 characters long',
              },
            })
          );
        }
        return this.reviewService.createReview(review).pipe(
          mergeMap((createdReview) => [
            ReviewsActions.createReviewSuccess({ review: createdReview }),
            // showNotification({ message: 'Review posted successfully!', type: 'success' })
          ]),
          catchError((error) =>
            of(
              ReviewsActions.createReviewFailure({ error })
              // showNotification({ message: 'Failed to post review', type: 'error' })
            )
          )
        );
      })
    )
  );

  reviewSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReviewsActions.createReviewSuccess),
        tap(({ review }) => {
          this.router.navigate(['/products', review.product.id]);
        })
      ),
    { dispatch: false }
  );

  loadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewsActions.loadReviews),
      mergeMap(({ productId }) =>
        this.reviewService.getProductReviews(productId).pipe(
          map((reviews) => ReviewsActions.loadReviewsSuccess({ reviews })),
          catchError((error) =>
            of(
              ReviewsActions.loadReviewsFailure({ error })
              // showNotification({ message: 'Failed to load reviews', type: 'error' })
            )
          )
        )
      )
    )
  );

  updateReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewsActions.updateReview),
      mergeMap(({ reviewId, review }) => {
        // Validate review update
        if (!review.text || review.text.length < 10) {
          return of(
            ReviewsActions.updateReviewFailure({
              error: {
                status: 400,
                statusText: 'Review must be at least 10 characters long',
              },
            })
          );
        }
        return this.reviewService.updateReview(reviewId, review).pipe(
          mergeMap((updatedReview) => [
            ReviewsActions.updateReviewSuccess({ review: updatedReview }),
            // showNotification({ message: 'Review updated successfully!', type: 'success' })
          ]),
          catchError((error) =>
            of(
              ReviewsActions.updateReviewFailure({ error })
              // showNotification({ message: 'Failed to update review', type: 'error' })
            )
          )
        );
      })
    )
  );
}
