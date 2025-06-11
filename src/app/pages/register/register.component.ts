import { Component } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { AuthLayout } from '../../core/layouts/auth-layout/auth-layout.component';

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
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatpassword: new FormControl('', [Validators.required]),
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

  onSubmit() {
    if (this.registerForm.invalid) return;
    console.log(this.registerForm.value);
    this.registerForm.reset();
  }
}
