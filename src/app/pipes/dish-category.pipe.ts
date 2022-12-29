import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../shared/dish';

@Pipe({
  name: 'dishCategory'
})
export class DishCategoryPipe implements PipeTransform {

  transform(dishes: Dish[], categories: string[]): Dish[] {
    if (!dishes || categories.length === 0) {
      return dishes;
    }
    return dishes.filter(dish => categories.includes(dish.category));
  }

}
