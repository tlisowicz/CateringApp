import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../shared/dish';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(dishes: Dish[], topRange:number=1e10, bottomRange: number=-1 ): Dish[] {
    if (!dishes) {
      return dishes;
    }
    
    if (topRange>=1e10){
      topRange = dishes.find(dish => dish.price === Math.max(...dishes.map(dish => dish.price)))!.price;
    }

    if (bottomRange<0){
      bottomRange = dishes.find(dish => dish.price === Math.min(...dishes.map(dish => dish.price)))!.price;
    }

    return dishes.filter(dish => dish.price >= bottomRange && dish.price <= topRange);
  }

}
