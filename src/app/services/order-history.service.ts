import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dish } from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  dishes: Map<number, [Dish, number, Date][]> = new Map();

  constructor() { }

  setOrderHistory(dishes: [Dish, number][], userId:number, date: Date) {
    const dishesWithDate: [Dish, number, Date][] = dishes.map(dish => [dish[0], dish[1], date])
    if (this.dishes.has(userId)) {
      this.dishes.get(userId)?.push(...dishesWithDate);
    }
    else
    {
      this.dishes.set(userId, dishesWithDate);
    }
    console.log(`set history for user ${userId} to`, this.dishes)
  }

  getOrderHistory(userId:number): Observable<[Dish, number, Date][] | undefined> {
    console.log(`get history for user ${userId} to:`, this.dishes)
    return of(this.dishes.get(userId));

  }



}
