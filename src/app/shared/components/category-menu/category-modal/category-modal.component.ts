import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Section {
  title: string;
  items?: string[];
}

interface CategoryDetails {
  title: string;
  sections?: Section[];
}

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-modal.component.html',
})
export class CategoryModalComponent implements OnChanges {
  @Input() initialCategory: string | null = 'phones';

  mainCategories = [
    { id: 'phones', name: 'Телефоны и гаджеты' },
    { id: 'appliances', name: 'Бытовая техника' },
    { id: 'tv', name: 'ТВ, Аудио, Видео' },
    { id: 'computers', name: 'Компьютеры' },
    { id: 'furniture', name: 'Мебель' },
    { id: 'beauty', name: 'Красота, здоровье' },
    { id: 'kids', name: 'Детские товары' },
    { id: 'pharmacy', name: 'Аптека' },
    { id: 'construction', name: 'Строительство, ремонт' },
    { id: 'sports', name: 'Спорт, туризм' },
    { id: 'leisure', name: 'Досуг, книги' },
    { id: 'auto', name: 'Автотовары' },
    { id: 'jewelry', name: 'Украшения' },
    { id: 'accessories', name: 'Аксессуары' },
    { id: 'clothing', name: 'Одежда' },
    { id: 'shoes', name: 'Обувь' },
    { id: 'home', name: 'Товары для дома и дачи' },
  ];

  categoryData: Record<string, CategoryDetails> = {
    phones: {
      title: 'Телефоны и гаджеты',
      sections: [
        { title: 'СМАРТФОНЫ' },
        { title: 'МОБИЛЬНЫЕ ТЕЛЕФОНЫ' },
        { title: 'РАДИОТЕЛЕФОНЫ' },
        { title: 'СПУТНИКОВЫЕ ТЕЛЕФОНЫ И КОММУНИКАТОРЫ' },
        {
          title: 'АКСЕССУАРЫ ДЛЯ ТЕЛЕФОНОВ',
          items: [
            'Чехлы для смартфонов',
            'Защитные пленки и стекла для смартфонов',
            'Держатели для телефонов',
            'Зарядные устройства',
            'Кабели и переходники для смартфонов',
            'Внешние аккумуляторы',
          ],
        },
        {
          title: 'ГАДЖЕТЫ',
          items: [
            'Смарт-часы',
            'Ремешки для смарт-часов и фитнес-браслетов',
            'Фитнес-браслеты',
          ],
        },
        {
          title: 'ДОПОЛНИТЕЛЬНО',
          items: [
            'Наклейки для телефонов',
            'Увеличительные экраны для смартфонов',
          ],
        },
      ],
    },
    appliances: {
      title: 'Бытовая техника',
      sections: [
        { title: 'КРУПНАЯ БЫТОВАЯ ТЕХНИКА' },
        { title: 'МЕЛКАЯ БЫТОВАЯ ТЕХНИКА' },
        { title: 'КУХОННАЯ ТЕХНИКА' },
        {
          title: 'СТИРАЛЬНЫЕ И ПОСУДОМОЕЧНЫЕ МАШИНЫ',
          items: ['Стиральные машины', 'Посудомоечные машины'],
        },
        { title: 'ДОПОЛНИТЕЛЬНО', items: ['Пылесосы', 'Утюги и отпариватели'] },
      ],
    },
    tv: {
      title: 'ТВ, Аудио, Видео',
      sections: [
        { title: 'ТЕЛЕВИЗОРЫ' },
        { title: 'АУДИОСИСТЕМЫ' },
        { title: 'ВИДЕОТЕХНИКА' },
        {
          title: 'АУДИООБОРУДОВАНИЕ',
          items: ['Колонки', 'Наушники', 'Музыкальные центры'],
        },
        { title: 'ДОПОЛНИТЕЛЬНО', items: ['Видеокамеры', 'Фотоаппараты'] },
      ],
    },
    computers: {
      title: 'Компьютеры',
      sections: [
        { title: 'НАСТОЛЬНЫЕ КОМПЬЮТЕРЫ' },
        { title: 'НОУТБУКИ' },
        { title: 'ПЛАНШЕТЫ' },
        {
          title: 'КОМПЛЕКТУЮЩИЕ',
          items: ['Процессоры', 'Видеокарты', 'Материнские платы'],
        },
        { title: 'ДОПОЛНИТЕЛЬНО', items: ['Мониторы', 'Клавиатуры', 'Мыши'] },
      ],
    },
    furniture: {
      title: 'Мебель',
      sections: [
        { title: 'ДИВАНЫ' },
        { title: 'КРОВАТИ' },
        { title: 'СТОЛЫ И СТУЛЬЯ' },
        {
          title: 'ШКАФЫ И КОМОДЫ',
          items: ['Шкафы-купе', 'Комоды', 'Тумбы'],
        },
        {
          title: 'ДОПОЛНИТЕЛЬНО',
          items: ['Матрасы', 'Пуфы', 'Полки'],
        },
      ],
    },
    beauty: {
      title: 'Красота, здоровье',
      sections: [
        { title: 'КОСМЕТИКА' },
        { title: 'ПАРФЮМЕРИЯ' },
        {
          title: 'УХОД ЗА КОЖЕЙ',
          items: ['Кремы', 'Сыворотки', 'Маски'],
        },
        {
          title: 'УХОД ЗА ВОЛОСАМИ',
          items: ['Шампуни', 'Бальзамы', 'Маски для волос'],
        },
        { title: 'ДОПОЛНИТЕЛЬНО', items: ['БАДы', 'Массажёры'] },
      ],
    },
    kids: {
      title: 'Детские товары',
      sections: [
        { title: 'ИГРУШКИ' },
        { title: 'КОЛЯСКИ' },
        { title: 'ДЕТСКАЯ МЕБЕЛЬ' },
        {
          title: 'ОДЕЖДА ДЛЯ ДЕТЕЙ',
          items: ['Комбинезоны', 'Платья', 'Футболки'],
        },
        { title: 'ДОПОЛНИТЕЛЬНО', items: ['Подгузники', 'Соски', 'Бутылочки'] },
      ],
    },
    pharmacy: {
      title: 'Аптека',
      sections: [
        { title: 'МЕДИКАМЕНТЫ' },
        { title: 'ВИТАМИНЫ И БАДы' },
        { title: 'МЕДТЕХНИКА' },
        {
          title: 'УХОД И ГИГИЕНА',
          items: ['Антисептики', 'Бинты', 'Термометры'],
        },
        {
          title: 'ДОПОЛНИТЕЛЬНО',
          items: ['Контактные линзы', 'Средства для похудения'],
        },
      ],
    },
  };

  activeCategory: string = 'phones';
  showSidebar = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialCategory']) {
      const val: string | null = changes['initialCategory'].currentValue;
      if (!val) {
        return;
      }

      if (val === 'all') {
        this.showSidebar = true;
        this.activeCategory = 'phones';
      } else {
        this.showSidebar = false;
        this.activeCategory = val;
      }
    }
  }

  setActiveCategory(id: string) {
    this.activeCategory = id;
  }

  get currentCategory(): CategoryDetails | undefined {
    return this.categoryData[this.activeCategory];
  }
}
