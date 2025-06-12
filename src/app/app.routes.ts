import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
    },
    {
      path: '',
      loadComponent: () =>
        import('./core/layouts/main-layout/main-layout.component').then(
          (m) => m.MainLayout,
        ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/home/home.component').then((m) => m.HomeComponent),
          },
          {
            path:'profile',
            loadComponent: () =>
              import('./pages/profile/profile.component').then(
                (m) => m.ProfileComponent
              )
          },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then(
            (m) => m.NotfoundComponent,
          ),
      },
    ],
  },
];
