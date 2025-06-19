import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { baseUrlInterceptor } from './core/interceptors/base-url';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { APP_BASE_HREF } from '@angular/common';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';

import { effects } from './store/effects';
import { CustomRouterSerializer } from './store/state/router.state';
import { reducers } from './store/reducers';

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
    provideStore(reducers),
    provideEffects(effects),
    provideRouterStore({
      serializer: CustomRouterSerializer,
    }),
  ],
};
