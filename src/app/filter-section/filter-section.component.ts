import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DishFetchService } from '../services/dish-fetch.service';
import { FilterDataService } from '../services/filter-data.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.css']
})
export class FilterSectionComponent {

  categories: string[] = [];
  kitchenTypes:string[] = [];
  dishTypes: string[] = [];

  selectedCategories: string[] = [];
  searchPhrase: string = "";
  selectedKitchenTypes: string[] = [];
  selectedDishTypes: string[] = [];
  priceTop: number = 1e10;
  priceBottom: number = -1;
  selectedRating: string | null = null;

  constructor(
    private filterService: FilterDataService, 
    private dishService: DishFetchService,
    private router: Router
  ) {
    router.events.subscribe(() => {
      this.clearValues();
    });

    this.dishService.getDishes().subscribe(dishes => {
      dishes.forEach(dish => {
        if (!this.categories.includes(dish.category)) {
          this.categories.push(dish.category);
        }
        if (!this.kitchenTypes.includes(dish.kitchenType)) {
          this.kitchenTypes.push(dish.kitchenType);
        }
        if (!this.dishTypes.includes(dish.typeByIngredients)) {
          this.dishTypes.push(dish.typeByIngredients);
        }
      })
    })
  }

  clearValues() {
    this.selectedCategories = [];
    this.searchPhrase = "";
    this.selectedKitchenTypes = [];
    this.selectedDishTypes = [];
    this.priceTop = 1e10;
    this.priceBottom = -1;
    this.selectedRating = null;

    this.setCategories();
    this.setSearchPhrase();
    this.setKitchenTypes();
    this.setDishTypes();
    this.setPriceTop();
    this.setPriceBottom();
    this.setRating();

  }

  setSearchPhrase() {
    this.filterService.setSearchPhrase(this.searchPhrase);
  }

  setCategories() {
    if (this.selectedCategories[0] === 'All') {
      this.selectedCategories = [];
    }
    this.filterService.setCategories(this.selectedCategories);
  }

  setKitchenTypes() {
    if (this.selectedKitchenTypes[0] === 'All') {
      this.selectedKitchenTypes = [];
    }
    this.filterService.setKitchenTypes(this.selectedKitchenTypes);
  }

  setDishTypes() {
    if (this.selectedDishTypes[0] === 'All') {
      this.selectedDishTypes = [];
    }
    this.filterService.setDishTypes(this.selectedDishTypes);
  }

  setPriceTop() {
    if (this.priceTop < this.priceBottom) {
      this.priceTop = this.priceBottom;
    }
    this.filterService.setPriceTop(this.priceTop);
  }

  setPriceBottom() {
    if (this.priceTop < this.priceBottom) {
      this.priceBottom = this.priceTop;
    }

    this.filterService.setPriceBottom(this.priceBottom);
  }

  setRating() {
    if (this.selectedRating === 'Not rated') {
      this.selectedRating = null;
      this.filterService.setRating(null);
      return;
    }
    this.filterService.setRating(Number(this.selectedRating));
  }
}
