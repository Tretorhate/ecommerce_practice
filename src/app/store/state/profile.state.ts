import { Profile } from '../../shared/models/profile.model';
import { Error } from '../../shared/models/error.model';

export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
}
