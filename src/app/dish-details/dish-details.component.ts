import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Router, ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { CurrencyService } from '../services/currency.service';
@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})

export class DishDetailsComponent implements OnInit {
  dish: Dish = {} as Dish;
  currency: string = "";
  @Input() currentlyAvaliable: number = 0;

  constructor(
    private router:Router, 
    private activatedRoute:ActivatedRoute,
    private dishServie: DishService,
    private currencySercvice: CurrencyService
  ) 
  {
    this.currencySercvice.currency.subscribe(currency => {
      this.currency = currency;
    });
  }
  
  ngOnInit(): void {
    const dishId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.currentlyAvaliable = history.state.currentlyAvaliable;
    this.dishServie.getDish(dishId)
    .subscribe(dish => this.dish = dish);
  }
}
