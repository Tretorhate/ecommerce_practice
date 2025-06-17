import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../../../../shared/services/profile/profile.service';
import { Profile } from '../../../../shared/models/profile.model';
import { Error } from '../../../../shared/models/error.model';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'profile-info',
  imports: [FormsModule, FormsModule, ProfilePictureComponent,ReactiveFormsModule],
  templateUrl: './profile-info.component.html',
})
export class ProfileInfoComponent implements OnInit {
  constructor(private profileService: ProfileService) {}
  isProfileInfoLoading = signal(false);
  isEmailLoading = signal(false);
  isNameLoading = signal(false);
  profileChangeError = signal<Error>({ status: '', statusText: '' });
  profileInfo = signal<Pick<Profile, 'id' |'picture' | 'name' | 'email'>>({
    id:'',
    picture: '',
    name: '',
    email: '',
  });
  isEditingName = signal(false);
  isEditingEmail = signal(false);
  toggleEditName() {
    this.isEditingName.set(!this.isEditingName());
  }
  toggleEditEmail() {
    this.isEditingEmail.set(!this.isEditingEmail());
  }
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  saveName() {
    if (this.profileForm.get('name')?.invalid) {
      this.isNameLoading.set(false);
      return;
    }
    this.isNameLoading.set(true);
    const name = this.profileForm.get('name')?.value!;

    this.profileService.updateField('name', name).subscribe({
      next: (res) => {
        this.isNameLoading.set(false);
        
        this.profileInfo.update((profile) => ({ ...profile, name }));
      },
      error: (err) => {
        this.isNameLoading.set(false);
        console.log(err);
      },
    });
    this.isEditingName.set(false);
  }
  saveEmail() {
    if (this.profileForm.get('email')?.invalid) return;
    const email: string = this.profileForm.get('email')?.value!;
    this.isEmailLoading.set(true);
    this.profileService.updateField('email', email).subscribe({
      next: (res) => {
        this.isEmailLoading.set(false);

        this.profileInfo.update((profile) => ({ ...profile, email }));
        this.isEditingEmail.set(false);
      },
      error: (err) => {
        this.isEmailLoading.set(false);
        console.log(err);
      },
    });
  }
  getProfileInfo() {
    this.isProfileInfoLoading.set(true);
    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.isProfileInfoLoading.set(false);
        this.profileInfo.set(res);
       
        this.profileForm.patchValue({
          name: res.name,
          email: res.email,
        });
      },
      error: (err) => {
        this.isProfileInfoLoading.set(false);
        this.profileChangeError.set({
          status: err.status,
          statusText: err.statusText,
        });
      },
    });
  }
  ngOnInit() {
    this.getProfileInfo();
  }
}
