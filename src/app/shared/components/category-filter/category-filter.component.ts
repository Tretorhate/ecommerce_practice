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
  @Output() categorySelected = new EventEmitter<string>();

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
    const search = (list: Category[], parents: Category[] = []): boolean => {
      for (const item of list) {
        if (item.id === id) {
          return true;
        }
        if (item.children) {
          if (search(item.children, [...parents, item])) {
            return true;
          }
        }
      }
      return false;
    };
    search(this.categories);
  }

  toggleCategory(cat: Category) {
    this.expanded[cat.id] = !this.expanded[cat.id];
  }

  selectCategory(id: string) {
    this.categorySelected.emit(id);
  }
}
