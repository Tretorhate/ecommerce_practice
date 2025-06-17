import { createReducer, on } from '@ngrx/store';
import { ReviewsState } from '../state/reviews.state';
import * as ReviewsActions from '../actions/reviews.actions';

export const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewsReducer = createReducer(
  initialState,
  // Create review
  on(ReviewsActions.createReview, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReviewsActions.createReviewSuccess, (state, { review }) => ({
    ...state,
    reviews: [...state.reviews, review],
    loading: false,
    error: null,
  })),
  on(ReviewsActions.createReviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load reviews
  on(ReviewsActions.loadReviews, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReviewsActions.loadReviewsSuccess, (state, { reviews }) => ({
    ...state,
    reviews,
    loading: false,
    error: null,
  })),
  on(ReviewsActions.loadReviewsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update review
  on(ReviewsActions.updateReview, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReviewsActions.updateReviewSuccess, (state, { review }) => ({
    ...state,
    reviews: state.reviews.map((r) => (r.id === review.id ? review : r)),
    loading: false,
    error: null,
  })),
  on(ReviewsActions.updateReviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
