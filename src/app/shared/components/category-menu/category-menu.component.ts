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
    {
      id: 'all',
      parentId: null,
      title: 'ВСЕ КАТЕГОРИИ',
      description: null,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'phones',
      parentId: null,
      title: 'ТЕЛЕФОНЫ И ГАДЖЕТЫ',
      description: null,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'appliances',
      parentId: null,
      title: 'БЫТОВАЯ ТЕХНИКА',
      description: null,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'tv',
      parentId: null,
      title: 'ТВ, АУДИО, ВИДЕО',
      description: null,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'computers',
      parentId: null,
      title: 'КОМПЬЮТЕРЫ',
      description: null,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'furniture',
      parentId: null,
      title: 'МЕБЕЛЬ',
      description: null,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'beauty',
      parentId: null,
      title: 'КРАСОТА, ЗДОРОВЬЕ',
      description: null,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'kids',
      parentId: null,
      title: 'ДЕТСКИЕ ТОВАРЫ',
      description: null,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'pharmacy',
      parentId: null,
      title: 'АПТЕКА',
      description: null,
      createdAt: '',
      updatedAt: '',
    },
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
