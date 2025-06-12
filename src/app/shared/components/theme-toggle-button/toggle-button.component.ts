import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-toggle-btn',
  imports: [ButtonModule],
  template: `
    <p-button label="Toggle Dark Mode" (onClick)="toggleDarkMode()" />
  `,
})
export class ToggleButtonComponent {
  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('dark-mode');
  }
}
