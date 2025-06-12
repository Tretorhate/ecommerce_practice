import { Component, inject } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthLayout } from '../../core/layouts/auth-layout/auth-layout.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { User } from '../../shared/types';
import { ToastModule } from 'primeng/toast';

type RegisterResponse = {
  accessToken: string;
  user: User;
};

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    FloatLabelModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterLink,
    AuthLayout,
    ToastModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private messageService = inject(MessageService);

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      repeatpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: this.passwordMatchValidator },
  );

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password');
    const repeat = form.get('repeatpassword');

    if (!password || !repeat) return null;

    if (password.value !== repeat.value) {
      repeat.setErrors({ passwordMismatch: true });
      password.setErrors({ passwordMismatch: true });
    } else {
      if (
        repeat.hasError('passwordMismatch') ||
        password.hasError('passwordMismatch')
      ) {
        repeat.setErrors(null);
        password.setErrors(null);
      }
    }

    return null;
  }

  showSuccessToaster() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Login ',
    });
  }

  showErrorToaster(error: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
    });
  }

  onSubmit() {
    if (
      this.registerForm.invalid ||
      !this.registerForm.value?.email ||
      !this.registerForm.value?.password ||
      !this.registerForm.value?.name
    )
      return;
    this.auth
      .register({
        email: this.registerForm.value.email,
        name: this.registerForm.value.name,
        password: this.registerForm.value.password,
      })
      .subscribe({
        next: (value: RegisterResponse) => {
          localStorage.setItem('accessToken', value.accessToken);
          console.log(value.accessToken);
          this.showSuccessToaster();
          this.registerForm.reset();
          this.router.navigate(['/']);
        },

        error: (err) =>
          this.showErrorToaster(err.error?.message || err.error.error),
      });
  }
}
