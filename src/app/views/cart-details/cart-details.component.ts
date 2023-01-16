import { Component } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history.service';
import { CartContentService } from '../../services/cart-content.service';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../shared/dish';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  dishes: [Dish, number][] = [];
  page: number = 1; 
  showModal: boolean = false;
  username = '';

  constructor
  (
    private cartService: CartContentService,
    private dishService: DishService,
    private orderService: OrderHistoryService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.cartService.dishesSubject.subscribe(dishes => {
      this.dishes = dishes;
    });
    this.auth.userState.subscribe(userState => {
      if (userState) {
        this.username = userState.username;
      } else {
        this.username = '';
      }
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
    this.orderService.addToHistory(this.dishes, this.username, new Date())
    .subscribe({
      next: () => this.cartService.removeAllDishes(),
    });
  }
}
