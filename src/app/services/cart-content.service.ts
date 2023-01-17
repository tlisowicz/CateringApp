import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish } from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class CartContentService {

  dishesSubject: BehaviorSubject<[Dish, number][]>
  dishes: [Dish, number][] = [];

  constructor() {
    const setValue = JSON.parse(sessionStorage.getItem("dishes") || "[]");
    this.dishes = setValue;
    this.dishesSubject = new BehaviorSubject<[Dish, number][]>(setValue);
  }

  addDish(dish: Dish) {
    if (this.dishes.length == 0 ) {
      this.dishes.push([dish, 1]);
      sessionStorage.setItem("dishes", JSON.stringify(this.dishes));
      this.dishesSubject.next(this.dishes);
      return;
    }
    
    if (this.dishes.find(dishMap => dishMap[0].id == dish.id) === undefined) {
      this.dishes.push([dish, 1]);
      sessionStorage.setItem("dishes", JSON.stringify(this.dishes));
      this.dishesSubject.next(this.dishes);
      return;

    }
     
    this.dishes.forEach(dishMap => {
      if (dishMap[0].id == dish.id) {
        dishMap[1]++;
      }
      sessionStorage.setItem("dishes", JSON.stringify(this.dishes));
      this.dishesSubject.next(this.dishes);
    });
  }

  removeOneDish(dish: Dish) {
    this.dishes.forEach(dishMap => {
      if (dishMap[0].id == dish.id) {
        dishMap[1]--;
        if (dishMap[1] == 0) {
          this.removeAllDishesOfType(dish);
        }
      }
    });
    sessionStorage.setItem("dishes", JSON.stringify(this.dishes));
    this.dishesSubject.next(this.dishes);
  }

  removeAllDishesOfType(dish: Dish) {
    this.dishes = this.dishes.filter(dishMap => dishMap[0].id != dish.id);
    sessionStorage.setItem("dishes", JSON.stringify(this.dishes));
    this.dishesSubject.next(this.dishes);
  }

  removeAllDishes() {
    this.dishes = [];
    sessionStorage.setItem("dishes", JSON.stringify(this.dishes));
    this.dishesSubject.next(this.dishes);
  }
  
  getTotalPrice(): number {
    let priceTotal = 0;
    this.dishes.forEach(dishMap => {
      priceTotal += dishMap[0].price * dishMap[1];
    });
    return priceTotal;
  }

  getNumberOfDishes(dish: Dish): number {
    let dishMap = this.dishes.find(dishMap => dishMap[0].id == dish.id);
    if (dishMap === undefined) {
      return 0;
    }
    return dishMap[1];
  }

  getTotalNumberOfDishes(): number {
    let total = 0;
    this.dishes.forEach(dishMap => {
      total += dishMap[1];
    });
    return total;
  }
}



