import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePictureService, UploadProgress } from '../../../../shared/services/profile/profile-picture.service';
import { ProfileService } from '../../../../shared/services/profile/profile.service'; 
import { take } from 'rxjs/operators'; 

@Component({
  selector: 'profile-picture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-picture.component.html',
})
export class ProfilePictureComponent {
  constructor(
    private profilePictureService: ProfilePictureService,
    private profileService: ProfileService 
  ) {}

  pictureUrl = input<string >();
  userId = input.required<string>();

  isPictureLoading = signal(false);
  isPictureEditing = signal(false);
  pictureChanged = output<string | undefined>();

  toggleEditPicture() {
    this.isPictureEditing.set(!this.isPictureEditing());
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let originalFile: File | undefined;

    if (inputElement.files && inputElement.files.length > 0) {
      originalFile = inputElement.files[0];
    } else {
      inputElement.value = '';
      return;
    }

    if (!originalFile.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения (JPG, PNG, GIF).');
      inputElement.value = '';
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (originalFile.size > maxSize) {
      alert(`Размер файла не должен превышать ${maxSize / (1024 * 1024)}MB.`);
      inputElement.value = '';
      return;
    }

    if (!this.userId()) {
      alert('Ошибка: ID пользователя не определен для загрузки изображения.');
      inputElement.value = '';
      return;
    }

    const fileExtension = originalFile.name.split('.').pop();
    const newFileName = `profilePic.${fileExtension}`;

    const fileToUpload = new File([originalFile], newFileName, { type: originalFile.type });

    this.isPictureLoading.set(true);

    this.profilePictureService.uploadProfilePicture(this.userId(), fileToUpload).subscribe({
      next: (uploadEvent: UploadProgress) => {
        if (uploadEvent.state === 'DONE' && uploadEvent.imageUrl) {
         
          this.profileService.updatePicture(uploadEvent.imageUrl).pipe(take(1)).subscribe({
            next: () => {

              this.isPictureLoading.set(false);
              this.isPictureEditing.set(false);
              this.pictureChanged.emit(uploadEvent.imageUrl); 
              window.location.reload();
            },
            error: (err) => {
              this.isPictureLoading.set(false); 
              alert(`Ошибка обновления ссылки на изображение в профиле: ${err.message || 'Неизвестная ошибка'}`);
              console.error('Error updating profile picture URL:', err);
            }
          });
        }
      
      }
      
      ,
      error: (err) => {
        this.isPictureLoading.set(false);
        alert(`Ошибка загрузки изображения: ${err.message || 'Неизвестная ошибка'}`);
        console.error('Error uploading profile picture:', err);
      },
      complete: () => {
       
      }
    });

    inputElement.value = '';
  }
}