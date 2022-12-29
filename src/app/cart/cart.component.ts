import { Component } from '@angular/core';
import { CartContentService } from '../services/cart-content.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  dishes: [Dish, number][] = [];
  priceTotal: number = 0;
  constructor(private cartService: CartContentService) { }

  ngOnInit(): void {
    this.cartService.dishesSubject.subscribe(dishes => {
      this.dishes = dishes;
      this.priceTotal = this.cartService.getTotalPrice();
    });
  }

}

  // removeOneDish(dish: [Dish, number]) {
  //   this.cartService.removeOneDish(dish);
  // }

