import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHistoryService } from '../services/order-history.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  dishes: [Dish, number, Date][] = [];
  uniqueDates: Set<Date> = new Set();
  @Input() userId: number = 0; 
  page: number = 1;

  constructor
  (
    private orderService: OrderHistoryService,
  ) {
    
   }

  ngOnInit(): void {
    this.orderService.getOrderHistory(this.userId).subscribe(dishes => {
      this.dishes = dishes ?? [];
      this.uniqueDates = new Set(this.dishes.map(dish => dish[2]));
    });
  }


}
