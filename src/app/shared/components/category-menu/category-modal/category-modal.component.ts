import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-modal.component.html',
})
export class CategoryModalComponent implements OnChanges {
  @Input() initialCategory: string | null = 'phones';

  mainCategories: Category[] = [];
  categories: Record<string, Category> = {};
  activeCategory: string = 'phones';
  showSidebar = false;

  private categoryService = inject(CategoryService);

  constructor() {
    this.categoryService.getCategories().subscribe((cats: unknown) => {
      if (Array.isArray(cats)) {
        this.mainCategories = cats.filter(
          (cat): cat is Category =>
            !!cat && typeof cat === 'object' && 'id' in cat && !cat.parentId
        );
        this.categories = cats.reduce((acc: Record<string, Category>, cat) => {
          if (cat && typeof cat === 'object' && 'id' in cat) {
            acc[(cat as Category).id] = cat as Category;
          }
          return acc;
        }, {});
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialCategory']) {
      const val: string | null = changes['initialCategory'].currentValue;
      if (!val) {
        return;
      }

      if (val === 'all') {
        this.showSidebar = true;
        this.activeCategory = this.mainCategories[0]?.id || '';
      } else {
        this.showSidebar = false;
        this.activeCategory = val;
      }
    }
  }

  setActiveCategory(id: string) {
    this.activeCategory = id;
  }

  get currentCategory(): Category | undefined {
    return this.categories[this.activeCategory];
  }
}
