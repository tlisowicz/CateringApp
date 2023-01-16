import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartContentService } from '../services/cart-content.service';
import { CurrencyService } from '../services/currency.service';
import { Dish } from '../shared/dish';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit{

  @Input() dish: Dish = {} as Dish;
  @Input() display: string = 'inMenu';
  @Input() selected: number = 0;
  currentlyAvaliable: number = 0;
  currency: string = "";
  isUserLoggedIn: boolean = false;

  constructor
  (
    private router: Router,
    private cartService: CartContentService,
    private currencyService: CurrencyService,
    private auth: AuthService
    ) { 
      this.currencyService.currency.subscribe(currency => {
        this.currency = currency;
      });
      this.auth.userState.subscribe(userState => {
        if (userState) {
          this.isUserLoggedIn = true
        }
        else {
          this.isUserLoggedIn = false;
        }
      });
     }

  ngOnInit() {
    if (this.display !== 'orderHistory'){
      this.selected = this.cartService.getNumberOfDishes(this.dish);
      this.currentlyAvaliable = this.dish.servingsPerDay -this.selected;
    }
  }
  
  increment(event: any) {
    event.stopPropagation();
    if (this.currentlyAvaliable) {
      this.currentlyAvaliable--;
      this.selected++;
    }
  }

  decrement(event: any) {
    event.stopPropagation();
    {
      if ( this.selected > 0) {
        this.currentlyAvaliable++;
        this.selected--;
      }
    }
  }

  gotoDishDetails(id: number) {
    this.router.navigateByUrl(
      '/dish-details/'+id, 
      { state: 
        { id: id, 
          currentlyAvaliable: this.currentlyAvaliable 
        }
      });
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }

  addToCart() {
    this.cartService.addDish(this.dish);
  }

  removeFromCart() {
    this.cartService.removeOneDish(this.dish);
  }

  removeAllOfTypeFromCart() {
    this.cartService.removeAllDishesOfType(this.dish);
  }
}
