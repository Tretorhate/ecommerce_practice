import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { baseUrlInterceptor } from './core/interceptors/base-url';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { APP_BASE_HREF } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(ToastModule),
    { provide: APP_BASE_HREF, useValue: '/' },
    MessageService,
    providePrimeNG({
      theme: {
        preset: Material,

        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
  ],
};
