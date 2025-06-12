import { Component } from '@angular/core';
import { CategoryMenuComponent } from '../../shared/common-ui/category-menu/category-menu.component';

@Component({
  selector: 'app-header',
  imports: [CategoryMenuComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
