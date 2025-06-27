import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-filter.component.html',
})
export class CategoryFilterComponent implements OnChanges {
  @Input() activeCategoryId: string | null = null;
  @Output() categorySelected = new EventEmitter<string | null>();

  categories: Category[] = [];
  expanded: { [id: string]: boolean } = {};

  private categoryService = inject(CategoryService);

  constructor() {
    this.categoryService.getCategories().subscribe((cats: unknown) => {
      if (Array.isArray(cats)) {
        this.categories = cats.filter(
          (cat): cat is Category =>
            !!cat && typeof cat === 'object' && 'id' in cat && !cat.parentId
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeCategoryId']) {
      const id = changes['activeCategoryId'].currentValue as string | null;
      if (id) {
        this.expandForCategory(id);
      }
    }
  }

  private expandForCategory(id: string) {
    this.expanded = {};

    const findAndExpand = (
      categories: Category[],
      targetId: string,
      parentPath: Category[] = []
    ): boolean => {
      for (const category of categories) {
        const currentPath = [...parentPath, category];

        if (category.id === targetId) {
          // Found the target category, expand all parents
          parentPath.forEach((parent) => {
            this.expanded[parent.id] = true;
          });
          return true;
        }

        if (category.children && category.children.length > 0) {
          if (findAndExpand(category.children, targetId, currentPath)) {
            return true;
          }
        }
      }
      return false;
    };

    findAndExpand(this.categories, id);
  }

  toggleCategory(cat: Category) {
    this.expanded[cat.id] = !this.expanded[cat.id];
  }

  selectCategory(id: string) {
    this.categorySelected.emit(id);
  }

  isCategoryActive(categoryId: string): boolean {
    if (!this.activeCategoryId) return false;
    if (this.activeCategoryId === categoryId) return true;

    // Check if this category is a parent of the active category
    return this.isParentOfActive(categoryId, this.categories);
  }

  private isParentOfActive(
    categoryId: string,
    categories: Category[]
  ): boolean {
    for (const cat of categories) {
      if (cat.id === categoryId && cat.children) {
        for (const child of cat.children) {
          if (
            child.id === this.activeCategoryId ||
            this.isParentOfActive(child.id, [child])
          ) {
            return true;
          }
        }
      }
      if (cat.children) {
        if (this.isParentOfActive(categoryId, cat.children)) {
          return true;
        }
      }
    }
    return false;
  }
}
