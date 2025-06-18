import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  template: `
    <app-header />
    <main
      class="flex justify-center items-center min-h-[95svh] mt-5 bg-[#EEEEEE]"
    >
      <div class="w-full max-w-[1440px] px-4 sm:px-6 lg:px-6 xl:px-[225px]">
        <router-outlet></router-outlet>
      </div>
    </main>
    <app-footer />
  `,
})
export class MainLayout {}
