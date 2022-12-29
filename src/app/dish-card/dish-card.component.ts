import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartContentService } from '../services/cart-content.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit{

  @Input() dish: Dish = {} as Dish;
  @Input() display: string = 'inMenu';
  currentlyAvaliable: number = 0;
  selected: number = 0;

  constructor
  (
    private router: Router,
    private cartService: CartContentService
    ) {  }

  ngOnInit() {
    this.selected = this.cartService.getNumberOfDishes(this.dish);
    this.currentlyAvaliable = this.dish.servingsPerDay -this.selected;
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
        { dish: this.dish, 
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
