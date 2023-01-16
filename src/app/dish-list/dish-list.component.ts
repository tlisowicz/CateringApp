import { Component } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FilterDataService } from '../services/filter-data.service';
import { CartContentService } from '../services/cart-content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})

export class DishListComponent {
  dishes: Dish[] = [];
  mostExpensive?: Dish;
  leastExpensive?: Dish;

  page: number = 1;
  currentRoute: string = '';

  searchPhrase: string = "";
  categories: string[] = [];
  kitchenTypes:string[] = [];
  dishTypes: string[] = [];
  priceTop: number = 1e10;
  priceBottom: number = -1;
  rating: number | null = null;
  

  constructor
  (
    private dishService: DishService, 
    private filterService: FilterDataService,
    private router: Router,
  ) { };

  ngOnInit(): void {

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    this.getDishes();
    this.filterService.searchPhrase.subscribe(phrase => this.searchPhrase = phrase);
    this.filterService.categories.subscribe(categories => this.categories = categories);
    this.filterService.kitchenTypes.subscribe(kitchenTypes => this.kitchenTypes = kitchenTypes);
    this.filterService.dishTypes.subscribe(dishTypes => this.dishTypes = dishTypes);
    this.filterService.priceTop.subscribe(priceTop => this.priceTop = priceTop);
    this.filterService.priceBottom.subscribe(priceBottom => this.priceBottom = priceBottom);
    this.filterService.rating.subscribe(rating => this.rating = rating);
  }

    getDishes(): void {
      this.dishService.getDishes()
      .subscribe(dishes => {
        this.dishes = dishes;
        this.findMostExpensive();
        this.findLeastExpensive();
        this.filterService.setPriceTop(this.mostExpensive?.price ?? 1e10);
        this.filterService.setPriceBottom(this.leastExpensive?.price ?? -1);
      });
    }

    findMostExpensive() {
      this.mostExpensive = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
    }

    findLeastExpensive() {
      this.leastExpensive = this.dishes.reduce((prev, current) => (prev.price < current.price) ? prev : current);
    }


    deleteDish(dish: Dish) {
      if (!window.confirm("Are you sure you want to delete this dish?")) {
        return;
      }
      this.dishes = this.dishes.filter(d => d !== dish);
      this.dishService.deleteDish(dish.id).subscribe();
      this.findMostExpensive();
      this.findLeastExpensive();
    }
  }
