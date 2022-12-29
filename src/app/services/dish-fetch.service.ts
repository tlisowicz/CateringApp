import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/mock-dishes';

@Injectable({
  providedIn: 'root'
})

export class DishFetchService {

  dishes: Dish[];

  constructor() {
    this.dishes = DISHES;
  }

  getDishes(): Observable<Dish[]> {
    return of(this.dishes);
  }

  getDish(id: number): Observable<Dish> {
    const dish = this.dishes.find(dish => dish.id === id)!;
    return of(dish); 
  }

  addDish(dish: Dish) {
    this.dishes.push(dish);
  }
  
  deleteDish(dish: Dish) {
    console.log(dish);
    this.dishes = this.dishes.filter(d => d.id !== dish.id);
  }

  updateDishQuantity(dish: [Dish, number]) {
    console.log(dish, dish[0].servingsPerDay);
    this.dishes.forEach(d => {
      if (d.id === dish[0].id) {
        console.log(d.name)
        d.servingsPerDay -= dish[1];
      }
    });
  }
}