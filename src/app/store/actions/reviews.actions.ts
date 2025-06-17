import { createAction, props } from '@ngrx/store';
import { Review } from '../../shared/models/review.model';
import { Error } from '../../shared/models/error.model';

// Create Review
export const createReview = createAction(
  '[Reviews] Create Review',
  props<{ review: Review }>()
);

export const createReviewSuccess = createAction(
  '[Reviews] Create Review Success',
  props<{ review: Review }>()
);

export const createReviewFailure = createAction(
  '[Reviews] Create Review Failure',
  props<{ error: Error }>()
);

// Load Reviews
export const loadReviews = createAction(
  '[Reviews] Load Reviews',
  props<{ productId: string }>()
);

export const loadReviewsSuccess = createAction(
  '[Reviews] Load Reviews Success',
  props<{ reviews: Review[] }>()
);

export const loadReviewsFailure = createAction(
  '[Reviews] Load Reviews Failure',
  props<{ error: Error }>()
);

// Update Review
export const updateReview = createAction(
  '[Reviews] Update Review',
  props<{ reviewId: string; review: Review }>()
);

export const updateReviewSuccess = createAction(
  '[Reviews] Update Review Success',
  props<{ review: Review }>()
);

export const updateReviewFailure = createAction(
  '[Reviews] Update Review Failure',
  props<{ error: Error }>()
);
