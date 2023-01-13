import { Component } from '@angular/core';
import { OrderHistoryService } from '../services/order-history.service';
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
  showModal: boolean = false;

  constructor
  (
    private cartService: CartContentService,
    private dishService: DishFetchService,
    private orderService: OrderHistoryService
  ) { }

  ngOnInit(): void {
    this.cartService.dishesSubject.subscribe(dishes => {
      this.dishes = dishes;
    });
  }

  clearCart() {
    this.cartService.removeAllDishes();
  }

  submitOrder() {
    this.showModal = true;
    this.dishes.forEach(dish => {
      this.dishService.updateDishQuantity(dish).subscribe();
    });
    this.orderService.setOrderHistory(this.dishes, 0 ,new Date());
    this.cartService.removeAllDishes();
  }
}
