import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

interface CategoryItem {
  id: string;
  title: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full max-w-7xl mx-auto">
      <button
        (click)="previousSet()"
        class="absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-[#E5E5E5] rounded-full border border-gray-600 p-3 hover:bg-gray-400 transition-colors duration-200"
      >
        <svg
          class="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      <button
        (click)="nextSet()"
        class="absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-[#E5E5E5] rounded-full border border-gray-600 p-3 hover:bg-gray-400 transition-colors duration-200"
      >
        <svg
          class="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>

      <div class="relative overflow-hidden">
        <div
          class="grid grid-cols-5 grid-rows-2 gap-4 h-[32rem] p-4"
          [@slideAnimation]="currentSetIndex"
        >
          @for (category of currentCategories; track trackByFn($index,
          category)) {
          <div
            class="bg-white rounded-lg cursor-pointer"
            (click)="onCategoryClick(category)"
          >
            <div class="flex flex-col items-center justify-center h-full p-6">
              <h3
                class="text-sm font-semibold text-gray-800 text-center leading-tight px-1 mb-4 uppercase"
              >
                {{ category.title }}
              </h3>
              <div class="w-40 h-40 overflow-hidden rounded-lg">
                <img
                  [src]="category.image"
                  [alt]="category.alt"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          }
        </div>
      </div>

      <div class="flex justify-center mt-4 space-x-2">
        @for (dot of dots; track $index) {
        <button
          (click)="goToSet($index)"
          class="w-2 h-2 rounded-full transition-colors duration-200"
          [class.bg-blue-500]="$index === currentSetIndex"
          [class.bg-gray-300]="$index !== currentSetIndex"
        ></button>
        }
      </div>
    </div>

    <style>
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '800ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '800ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
  styleUrls: [],
})
export class CategoryCarouselComponent implements AfterViewInit {
  currentSetIndex = 0;
  itemsPerSet = 10;

  get totalSets(): number {
    return Math.ceil(this.categories.length / this.itemsPerSet);
  }

  get currentCategories(): CategoryItem[] {
    const startIndex = this.currentSetIndex * this.itemsPerSet;
    return this.categories.slice(startIndex, startIndex + this.itemsPerSet);
  }

  get dots(): number[] {
    return Array(this.totalSets)
      .fill(0)
      .map((_, i) => i);
  }

  categories: CategoryItem[] = [
    {
      id: '1',
      title: 'Телефоны и гаджеты',
      image: '/assets/images/categories/phones.png',
      alt: 'Phones and Gadgets',
    },
    {
      id: '2',
      title: 'Бытовая техника',
      image: '/assets/images/categories/appliances.png',
      alt: 'Home Appliances',
    },
    {
      id: '3',
      title: 'ТВ, Аудио, Видео',
      image: '/assets/images/categories/tv-audio.png',
      alt: 'TV, Audio, Video',
    },
    {
      id: '4',
      title: 'Компьютеры',
      image: '/assets/images/categories/computers.png',
      alt: 'Computers',
    },
    {
      id: '5',
      title: 'Товары для дома',
      image: '/assets/images/categories/home-goods.png',
      alt: 'Home Goods',
    },
    {
      id: '6',
      title: 'Красота и здоровье',
      image: '/assets/images/categories/beauty.png',
      alt: 'Beauty and Health',
    },
    {
      id: '7',
      title: 'Детские товары',
      image: '/assets/images/categories/kids.png',
      alt: 'Kids Products',
    },
    {
      id: '8',
      title: 'Аптека',
      image: '/assets/images/categories/pharmacy.png',
      alt: 'Pharmacy',
    },
    {
      id: '9',
      title: 'Одежда',
      image: '/assets/images/categories/clothing.png',
      alt: 'Clothing',
    },
    {
      id: '10',
      title: 'Автотовары',
      image: '/assets/images/categories/auto.png',
      alt: 'Auto Products',
    },
    {
      id: '11',
      title: 'Спорт и отдых',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Sports and Recreation',
    },
    {
      id: '12',
      title: 'Книги',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Books',
    },
    {
      id: '13',
      title: 'Музыкальные инструменты',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Musical Instruments',
    },
    {
      id: '14',
      title: 'Канцелярские товары',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Office Supplies',
    },
    {
      id: '15',
      title: 'Игрушки',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Toys',
    },
    {
      id: '16',
      title: 'Продукты питания',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Food Products',
    },
    {
      id: '17',
      title: 'Инструменты',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Tools',
    },
    {
      id: '18',
      title: 'Садовые товары',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Garden Supplies',
    },
    {
      id: '19',
      title: 'Мебель',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Furniture',
    },
    {
      id: '20',
      title: 'Ювелирные изделия',
      image: '/assets/images/categories/landscape-placeholder.svg',
      alt: 'Jewelry',
    },
  ];

  ngAfterViewInit(): void {
    // Component initialization if needed
  }

  nextSet(): void {
    this.currentSetIndex = (this.currentSetIndex + 1) % this.totalSets;
  }

  previousSet(): void {
    this.currentSetIndex =
      this.currentSetIndex === 0
        ? this.totalSets - 1
        : this.currentSetIndex - 1;
  }

  goToSet(index: number): void {
    this.currentSetIndex = index;
  }

  onCategoryClick(category: CategoryItem): void {
    console.log('Category clicked:', category);
    // Handle category navigation here
  }

  trackByFn(index: number, item: CategoryItem): string {
    return item.id;
  }
}
