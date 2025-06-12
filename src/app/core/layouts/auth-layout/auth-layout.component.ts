import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  template: `
    <main
      class="flex justify-center items-center max-w-md mx-auto min-h-[95svh] mt-5"
    >
      <ng-content />
    </main>
  `,
})
export class AuthLayout {}
