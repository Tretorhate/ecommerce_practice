import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartSidebarService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);

  public isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

  get isOpen(): boolean {
    return this.isOpenSubject.value;
  }

  openSidebar(): void {
    this.isOpenSubject.next(true);
  }

  closeSidebar(): void {
    this.isOpenSubject.next(false);
  }

  toggleSidebar(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
}
