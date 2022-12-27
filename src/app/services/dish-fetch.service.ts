import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/mock-dishes';

@Injectable({
  providedIn: 'root'
})

export class DishFetchService {
  private dishes: Dish[] = [];
  

  constructor() {
    this.dishes = DISHES; 
  }

  getDishes(): Dish[] {
    return this.dishes;
  }

  getDish(id: number): Dish | undefined {
    return this.dishes.find(dish => dish.id === id);
  }
  
}
