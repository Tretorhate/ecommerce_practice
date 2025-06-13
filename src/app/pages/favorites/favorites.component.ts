import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FavoriteItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating?: number;
  reviews?: number;
  bonusPercent?: number;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  favorites: FavoriteItem[] = [
    {
      id: 1,
      name: 'Художественный маркер 11219011_377029 80 шт',
      description: 'Профессиональные маркеры для рисования',
      price: 2799,
      imageUrl: 'assets/маркеры.jpeg',
      rating: 0,
      reviews: 0,
      bonusPercent: 5
    },
    {
      id: 2,
      name: 'Скетчбук Van Gogh 20k-04, B5, 80 л, синий',
      description: 'Скетчбук для рисования и скетчинга',
      price: 3179,
      imageUrl: 'assets/скетчбук.jpg',
      rating: 0,
      reviews: 0,
      bonusPercent: 5
    },
    {
      id: 3,
      name: 'Маркер Guangna Акриловый GN.8101-12, 12 шт, 1 мм, разноцветный',
      description: 'Яркие акриловые маркеры для творчества',
      price: 2309,
      imageUrl: 'assets/акриловые маркеры.jpeg',
      rating: 0,
      reviews: 0,
      bonusPercent: 5
    },
    {
      id: 4,
      name: 'Ручка линер SAKURA Pigma Micron POXSDK4C 3 шт, цвет чернил серый',
      description: 'Тонкие линеры для точной работы',
      price: 1890,
      imageUrl: 'assets/микрон.jpg',
      rating: 0,
      reviews: 0,
      bonusPercent: 5
    },
    {
      id: 5,
      name: 'Краски Гуашевые Сонет ЗХК 3641064 мультиколор 12 шт 40 мл',
      description: 'Гуашь для художественных работ',
      price: 1590,
      imageUrl: 'assets/гуашь.jpg',
      rating: 0,
      reviews: 0,
      bonusPercent: 5
    }
  ];

  removeFromFavorites(id: number): void {
    this.favorites = this.favorites.filter(item => item.id !== id);
  }
}


