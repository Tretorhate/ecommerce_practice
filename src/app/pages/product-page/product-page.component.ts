import { Component } from '@angular/core';
import { ProductItem } from '../../shared/models/product-item.model';

import { ReviewListComponent } from './components/review-list/review-list.component';
import { ActivatedRoute } from '@angular/router';
import { ProductInfoComponent } from './components/product-info/product-info.component';

@Component({
  selector: 'product-page',
  imports: [ReviewListComponent, ProductInfoComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  productId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
    });
  }
}
