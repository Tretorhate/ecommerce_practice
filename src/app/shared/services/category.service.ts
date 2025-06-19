import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/categories';

  private filterCmc(categories: Category[] | undefined): Category[] {
    if (!categories) return [];
    return categories
      .filter((cat) => !cat.id.startsWith('cmc') && !cat.id.startsWith('cmbt'))
      .map((cat) => ({
        ...cat,
        children: cat.children ? this.filterCmc(cat.children) : [],
      }));
  }

  private categories$ = this.http.get<Category[]>(this.apiUrl).pipe(
    map((categories) => this.filterCmc(categories)),
    shareReplay(1)
  );

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }
}
