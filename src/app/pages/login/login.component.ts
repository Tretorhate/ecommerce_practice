import { Component } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { AuthLayout } from '../../core/layouts/auth-layout/auth-layout.component';

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
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }
}
