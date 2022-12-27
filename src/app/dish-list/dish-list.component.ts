import { Component } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishFetchService } from '../services/dish-fetch.service';
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
  showAddForm: boolean = false;

  constructor(private dishFetchService: DishFetchService, private router: Router) { 
    this.dishes = dishFetchService.getDishes();
    this.findMostExpensive()
    this.findLeastExpensive()
    };

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
      this.findMostExpensive()
      this.findLeastExpensive()
    }

    addDish(dish: Dish) {
      this.dishes.push(dish);
      this.findMostExpensive()
      this.findLeastExpensive()
    }

  }
