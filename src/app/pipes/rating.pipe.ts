import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../shared/dish';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(dishes: Dish[],rating: number | null):  Dish[] {
    if (rating == null) return dishes;

    return dishes.filter(dish => dish.avarageRating! >= rating);
  }

}
