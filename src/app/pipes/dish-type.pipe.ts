import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../shared/dish';

@Pipe({
  name: 'dishType'
})
export class DishTypePipe implements PipeTransform {

  transform(dishes: Dish[], typeByIngredients: string[]): Dish[] {
    if (!dishes || typeByIngredients.length === 0) {
      return dishes;
    }
    typeByIngredients = typeByIngredients.map(typeByIngredients => typeByIngredients.toLowerCase());
    return dishes.filter(dish => typeByIngredients.includes(dish.typeByIngredients));
  }

}
