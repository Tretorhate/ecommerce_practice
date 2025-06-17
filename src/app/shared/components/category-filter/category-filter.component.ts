import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface CategoryItem {
  id: string;
  name: string;
  subcategories?: CategoryItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter.component.html',
})
export class CategoryFilterComponent implements OnChanges {
  @Input() activeCategoryId: string | null = null;
  @Output() categorySelected = new EventEmitter<string>();

  categories: CategoryItem[] = [
    {
      id: 'phones',
      name: 'Телефоны и гаджеты',
      expanded: false,
      subcategories: [
        {
          id: 'smartphones',
          name: 'Смартфоны',
          expanded: false,
          subcategories: [
            { id: 'iphone', name: 'iPhone' },
            { id: 'android', name: 'Android' },
          ],
        },
        {
          id: 'accessories',
          name: 'Аксессуары',
          expanded: false,
          subcategories: [
            { id: 'chargers', name: 'Зарядные устройства' },
            { id: 'cases', name: 'Чехлы' },
          ],
        },
      ],
    },
    {
      id: 'appliances',
      name: 'Бытовая техника',
      expanded: false,
      subcategories: [
        {
          id: 'large',
          name: 'Крупная техника',
        },
        {
          id: 'small',
          name: 'Мелкая техника',
        },
      ],
    },
    {
      id: 'tv',
      name: 'ТВ, Аудио, Видео',
      expanded: false,
      subcategories: [
        {
          id: 'tv-sets',
          name: 'Телевизоры',
        },
        {
          id: 'audio',
          name: 'Аудиосистемы',
        },
      ],
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeCategoryId']) {
      const id = changes['activeCategoryId'].currentValue as string | null;
      if (id) {
        this.expandForCategory(id);
      }
    }
  }

  private expandForCategory(id: string) {
    const search = (
      list: CategoryItem[],
      parents: CategoryItem[] = []
    ): boolean => {
      for (const item of list) {
        if (item.id === id) {
          parents.forEach((p) => (p.expanded = true));
          return true;
        }
        if (item.subcategories) {
          if (search(item.subcategories, [...parents, item])) {
            return true;
          }
        }
      }
      return false;
    };
    search(this.categories);
  }

  toggleCategory(cat: CategoryItem) {
    cat.expanded = !cat.expanded;
  }

  selectCategory(id: string) {
    this.categorySelected.emit(id);
  }
}
