import { Component } from '@angular/core';
import { CategoryCarouselComponent } from '../../shared/components/carousel/category-carousel.component';

@Component({
  selector: 'app-home',
  imports: [CategoryCarouselComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
