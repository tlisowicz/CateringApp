import { Component } from '@angular/core';
import { CartContentService } from '../services/cart-content.service';
import { CurrencyService } from '../services/currency.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  currency: string = "USD";
  dishes: [Dish, number][] = [];
  priceTotal: number = 0;
  numberOfDishesTotal: number = 0;
  constructor(private cartService: CartContentService, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.cartService.dishesSubject.subscribe(dishes => {
      this.dishes = dishes;
      this.priceTotal = this.cartService.getTotalPrice();
      this.numberOfDishesTotal = this.cartService.getTotalNumberOfDishes();
    });
    this.currencyService.currency.subscribe(currency => {
      this.currency = currency;
    });
  }

}