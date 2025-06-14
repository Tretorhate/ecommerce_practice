import { Component } from '@angular/core';
import { ReviewFormComponent } from '../profile/components/review-form/review-form.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-page',
  imports: [ReviewListComponent,],
  templateUrl: './product-page.component.html',

})
export class ProductPageComponent {
  productId: string = '';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.productId = params.get('id')!;
    console.log(this.productId)
  });
}

}
