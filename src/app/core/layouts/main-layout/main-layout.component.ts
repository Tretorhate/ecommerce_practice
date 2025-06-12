import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone:true, //i had to add this one, pls dont kill me
  imports: [RouterOutlet],
  template: `
    <header>Header content</header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>Footer content</footer>
  `,
})
export class MainLayout {}
