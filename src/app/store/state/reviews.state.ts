import { Review } from '../../shared/models/review.model';
import { Error } from '../../shared/models/error.model';

export interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: Error | null;
}
