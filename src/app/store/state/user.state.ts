import { User } from '../../shared/types';
import { Error } from '../../shared/models/error.model';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}
