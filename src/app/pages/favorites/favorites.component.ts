import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FavoriteItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
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
      name: 'Premium Watch',
      description: 'Luxury timepiece with leather strap',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format'
    },
    {
      id: 2,
      name: 'Designer Bag',
      description: 'Handcrafted leather bag',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format'
    },
    {
      id: 3,
      name: 'Smart Speaker',
      description: 'Voice-controlled smart speaker',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format'
    }
  ];

  removeFromFavorites(id: number): void {
    this.favorites = this.favorites.filter(item => item.id !== id);
  }
}


