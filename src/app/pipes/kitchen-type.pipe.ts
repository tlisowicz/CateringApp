import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../shared/dish';

@Pipe({
  name: 'kitchenType'
})
export class KitchenTypePipe implements PipeTransform {

  transform(dishes: Dish[], kitchenTypes: string[]): Dish[] {
    if (!dishes || kitchenTypes.length === 0) {
      return dishes;
    }
    return dishes.filter(dish => kitchenTypes.includes(dish.kitchenType));
  }
}
