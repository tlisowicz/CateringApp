import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  searchPhrase: BehaviorSubject<string>;
  categories: BehaviorSubject<string[]>;
  kitchenTypes: BehaviorSubject<string[]>;
  dishTypes: BehaviorSubject<string[]>;
  priceTop: BehaviorSubject<number>;
  priceBottom: BehaviorSubject<number>;
  rating: BehaviorSubject<number | null>;

  constructor() {
    this.searchPhrase = new BehaviorSubject<string>('');
    this.categories = new BehaviorSubject<string[]>([]);
    this.kitchenTypes = new BehaviorSubject<string[]>([]);
    this.dishTypes = new BehaviorSubject<string[]>([]);
    this.priceTop = new BehaviorSubject<number>(1e10);
    this.priceBottom = new BehaviorSubject<number>(-1);
    this.rating = new BehaviorSubject<number | null>(null);
  }

  setSearchPhrase(phrase: string) {
    this.searchPhrase.next(phrase);
  }

  setCategories(categories: string[]) {
    this.categories.next(categories);
  }

  setKitchenTypes(kitchenTypes: string[]) {
    this.kitchenTypes.next(kitchenTypes);
  }

  setDishTypes(dishTypes: string[]) {
    this.dishTypes.next(dishTypes);
  }

  setPriceTop(priceTop: number) {
    this.priceTop.next(priceTop);
  }

  setPriceBottom(priceBottom: number) {
    this.priceBottom.next(priceBottom);
  }

  setRating(rating: number | null) {
    this.rating.next(rating);
  }

  
}
