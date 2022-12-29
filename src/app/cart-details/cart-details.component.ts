import { Component } from '@angular/core';
import { CartContentService } from '../services/cart-content.service';
import { DishFetchService } from '../services/dish-fetch.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  dishes: [Dish, number][] = [];
  page: number = 1; 

  constructor
  (
    private cartService: CartContentService,
    private dishService: DishFetchService
  ) { }

  ngOnInit(): void {
    this.cartService.dishesSubject.subscribe(dishes => {
      this.dishes = dishes;
      console.log(this.dishes);
    });
  }

  clearCart() {
    this.cartService.removeAllDishes();
  }

  submitOrder() {
    this.dishes.forEach(dish => {
      console.log("before",dish[0], dish[0].servingsPerDay);
      this.dishService.updateDishQuantity(dish);
      console.log("after", dish[0], dish[0].servingsPerDay);

    });
    this.cartService.removeAllDishes();
  }
}
