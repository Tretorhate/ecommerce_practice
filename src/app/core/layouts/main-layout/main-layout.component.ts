import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../pages/header/header.component';
import { FooterComponent } from './../../../pages/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  template: `
    <app-header />
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer />
  `,
})
export class MainLayout {}
