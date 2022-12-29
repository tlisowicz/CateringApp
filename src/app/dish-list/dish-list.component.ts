import { Component } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishFetchService } from '../services/dish-fetch.service';
import { FilterDataService } from '../services/filter-data.service';
import { CartContentService } from '../services/cart-content.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})

export class DishListComponent {
  dishes: Dish[] = [];
  mostExpensive?: Dish;
  leastExpensive?: Dish;
  showAddForm: boolean = false;
  page: number = 1;

  searchPhrase: string = "";
  categories: string[] = [];
  kitchenTypes:string[] = [];
  dishTypes: string[] = [];
  priceTop: number = 1e10;
  priceBottom: number = -1;
  rating: number | null = null;
  

  constructor
  (
    private dishFetchService: DishFetchService, 
    private filterService: FilterDataService,
  ) { };

  ngOnInit(): void {
    this.getDishes();
    this.findMostExpensive();
    this.findLeastExpensive();

    this.filterService.searchPhrase.subscribe(phrase => this.searchPhrase = phrase);
    this.filterService.categories.subscribe(categories => this.categories = categories);
    this.filterService.kitchenTypes.subscribe(kitchenTypes => this.kitchenTypes = kitchenTypes);
    this.filterService.dishTypes.subscribe(dishTypes => this.dishTypes = dishTypes);
    this.filterService.priceTop.subscribe(priceTop => this.priceTop = priceTop);
    this.filterService.priceBottom.subscribe(priceBottom => this.priceBottom = priceBottom);
    this.filterService.rating.subscribe(rating => this.rating = rating);
  }

    getDishes(): void {
      this.dishFetchService.getDishes()
      .subscribe(dishes => this.dishes = dishes);
    }

    findMostExpensive() {
      this.mostExpensive = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
    }

    findLeastExpensive() {
      this.leastExpensive = this.dishes.reduce((prev, current) => (prev.price < current.price) ? prev : current);
    }

    showAddDishForm() {
      this.showAddForm = !this.showAddForm;
    }

    deleteDish(dish: Dish) {
      this.dishes = this.dishes.filter(d => d !== dish);
      this.dishFetchService.deleteDish(dish);
      this.findMostExpensive();
      this.findLeastExpensive();
    }
  }
