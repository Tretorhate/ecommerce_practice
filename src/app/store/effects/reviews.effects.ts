import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ReviewsActions from '../actions/reviews.actions';
import { ProductReviewService } from '../../shared/services/product-review/product-review.service';
import { Router } from '@angular/router';

@Injectable()
export class ReviewsEffects {
  // Create review with validation and side effects
  createReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewsActions.createReview),
      mergeMap(({ review }) => {
        // Validate review content
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

  // Navigate after review creation
  reviewSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReviewsActions.createReviewSuccess),
        tap(({ review }) => {
          // Navigate back to product page
          this.router.navigate(['/products', review.product.id]);
        })
      ),
    { dispatch: false }
  );

  // Load reviews with error handling
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

  // Update review with validation
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

  constructor(
    private actions$: Actions,
    private reviewService: ProductReviewService,
    private router: Router
  ) {}
}
