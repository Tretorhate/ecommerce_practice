import { Component } from '@angular/core';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { ReviewListComponent } from './components/review-list/review-list.component';

@Component({
  selector: 'product-page',
  imports: [ReviewFormComponent,ReviewListComponent],
  templateUrl: './product-page.component.html',

})
export class ProductPageComponent {

}
