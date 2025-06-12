import { Component, inject } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthLayout } from '../../core/layouts/auth-layout/auth-layout.component';
import { AuthService } from '../../shared/services/auth/auth.service';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { type User } from '../../shared/types';

type LoginResponse = {
  accessToken: string;
  user: User;
};

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private messageService = inject(MessageService);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

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
      this.loginForm.invalid ||
      !this.loginForm.value?.email ||
      !this.loginForm.value?.password
    )
      return;
    this.auth
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (value: LoginResponse) => {
          localStorage.setItem('accessToken', value.accessToken);
          console.log(value.accessToken);
          this.showSuccessToaster();
          this.loginForm.reset();
          this.router.navigate(['/']);
        },

        error: (err) =>
          this.showErrorToaster(err.error?.message || err.error.error),
      });
  }
}
