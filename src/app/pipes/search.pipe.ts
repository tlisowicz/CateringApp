import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../shared/dish';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(dishes: Dish[], term: string): Dish[] {
    if (!dishes || !term) {
      return dishes;
    }
    return dishes.filter(dish => dish.name.toLowerCase().includes(term.toLowerCase()));
  }

}
