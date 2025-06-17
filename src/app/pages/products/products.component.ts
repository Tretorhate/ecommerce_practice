import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
  brand: string;
  seller: string;
}

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    FormsModule,
    CategoryFilterComponent,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  selectedCategory: string | null = null;

  // Price filter
  minPrice: number | null = null;
  maxPrice: number | null = null;

  // Brand & seller filter
  brandOptions = [
    'Apple',
    'Samsung',
    'Xiaomi',
    'Generic',
    'LG',
    'JBL',
    'Philips',
  ];
  sellerOptions = [
    'Apple Store',
    'Samsung Official',
    'Mi Shop',
    'Case Shop',
    'LG Store',
    'ElectroWorld',
  ];

  selectedBrands = new Set<string>();
  selectedSellers = new Set<string>();

  private readonly categoryHierarchy: Record<string, string[]> = {
    phones: [
      'smartphones',
      'accessories',
      'iphone',
      'android',
      'chargers',
      'cases',
    ],
    smartphones: ['iphone', 'android'],
    accessories: ['chargers', 'cases'],
    appliances: ['large', 'small'],
    tv: ['tv-sets', 'audio'],
  };

  products: Product[] = [
    {
      id: 'p1',
      name: 'iPhone 14 Pro 128GB',
      price: 999,
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
      category: 'iphone',
      brand: 'Apple',
      seller: 'Apple Store',
    },
    {
      id: 'p2',
      name: 'Samsung Galaxy S23',
      price: 899,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center',
      category: 'android',
      brand: 'Samsung',
      seller: 'Samsung Official',
    },
    {
      id: 'p3',
      name: 'Xiaomi Mi 13',
      price: 699,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop&crop=center',
      category: 'android',
      brand: 'Xiaomi',
      seller: 'Mi Shop',
    },
    {
      id: 'p4',
      name: 'Apple MagSafe Charger',
      price: 39,
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop&crop=center',
      category: 'chargers',
      brand: 'Apple',
      seller: 'Apple Store',
    },
    {
      id: 'p5',
      name: 'Silicone Case for iPhone 14',
      price: 29,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&crop=center',
      category: 'cases',
      brand: 'Generic',
      seller: 'Case Shop',
    },
    {
      id: 'p6',
      name: 'LG OLED TV 55"',
      price: 1599,
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&crop=center',
      category: 'tv-sets',
      brand: 'LG',
      seller: 'LG Store',
    },
    {
      id: 'p7',
      name: 'JBL Flip 6 Bluetooth Speaker',
      price: 129,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center',
      category: 'audio',
      brand: 'JBL',
      seller: 'ElectroWorld',
    },
    {
      id: 'p8',
      name: 'Samsung Double Door Refrigerator',
      price: 899,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop&crop=center',
      category: 'large',
      brand: 'Samsung',
      seller: 'Samsung Official',
    },
    {
      id: 'p9',
      name: 'Philips Steam Iron',
      price: 59,
      rating: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
      category: 'small',
      brand: 'Philips',
      seller: 'ElectroWorld',
    },
  ];

  get filteredProducts(): Product[] {
    return this.products.filter((p) => {
      let matchCategory = true;
      if (this.selectedCategory) {
        if (p.category === this.selectedCategory) {
          matchCategory = true;
        } else {
          const descendants =
            this.categoryHierarchy[this.selectedCategory] || [];
          matchCategory = descendants.includes(p.category);
        }
      }

      const matchPriceMin =
        this.minPrice != null ? p.price >= this.minPrice : true;
      const matchPriceMax =
        this.maxPrice != null ? p.price <= this.maxPrice : true;
      const matchBrand = this.selectedBrands.size
        ? this.selectedBrands.has(p.brand)
        : true;
      const matchSeller = this.selectedSellers.size
        ? this.selectedSellers.has(p.seller)
        : true;

      return (
        matchCategory &&
        matchPriceMin &&
        matchPriceMax &&
        matchBrand &&
        matchSeller
      );
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const cat = params.get('cat');
      if (cat) {
        this.selectedCategory = cat;
      } else {
        this.selectedCategory = null;
      }
    });
  }

  onCategorySelected(categoryId: string) {
    if (categoryId === 'all') {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        queryParamsHandling: 'merge',
      });
      this.selectedCategory = null;
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { cat: categoryId },
        queryParamsHandling: 'merge',
      });
      this.selectedCategory = categoryId;
    }
  }

  toggleBrand(brand: string, checked: boolean) {
    if (checked) {
      this.selectedBrands.add(brand);
    } else {
      this.selectedBrands.delete(brand);
    }
  }

  toggleSeller(seller: string, checked: boolean) {
    if (checked) {
      this.selectedSellers.add(seller);
    } else {
      this.selectedSellers.delete(seller);
    }
  }
}
