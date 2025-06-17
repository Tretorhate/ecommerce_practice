import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryModalComponent } from './category-modal/category-modal.component';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoryModalComponent],
  templateUrl: './category-menu.component.html',
})
export class CategoryMenuComponent {
  categories = [
    { id: 'all', name: 'ВСЕ КАТЕГОРИИ' },
    { id: 'phones', name: 'ТЕЛЕФОНЫ И ГАДЖЕТЫ' },
    { id: 'appliances', name: 'БЫТОВАЯ ТЕХНИКА' },
    { id: 'tv', name: 'ТВ, АУДИО, ВИДЕО' },
    { id: 'computers', name: 'КОМПЬЮТЕРЫ' },
    { id: 'furniture', name: 'МЕБЕЛЬ' },
    { id: 'beauty', name: 'КРАСОТА, ЗДОРОВЬЕ' },
    { id: 'kids', name: 'ДЕТСКИЕ ТОВАРЫ' },
    { id: 'pharmacy', name: 'АПТЕКА' },
  ];

  isMenuOpen = false;
  activeCategoryId: string | null = null;

  onCategoryHover(id: string) {
    this.activeCategoryId = id;
    this.isMenuOpen = true;
  }

  onCategoryLeave() {
    this.isMenuOpen = false;
  }
}
