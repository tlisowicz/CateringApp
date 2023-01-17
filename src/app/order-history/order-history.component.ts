import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderHistoryService } from '../services/order-history.service';
import { Dish } from '../shared/dish';
import { OrderHistory } from '../shared/orderHistory';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orderHistories: OrderHistory[] = [];
  uniqueDates: Set<Date> = new Set();
  userName: string = '';
  page: number = 1;
  authorized: boolean = true;
  
  constructor(
    private orderService: OrderHistoryService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.auth.userState.subscribe(userState => {
      if (userState) {
        this.userName = userState.username;
      } else {
        this.userName = '';
      }
    });
  }

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.paramMap.get('user') as string;
    this.orderService.getOrderHistory(username)
    .subscribe({
      next: orderHistoryArray => {
      this.orderHistories = orderHistoryArray;
      this.orderHistories.sort((a, b) => {
        return new Date(b.date as string).getTime() - new Date(a.date as string).getTime();
      });
    }, error: err => {this.authorized = false;}
  });
  }
  

}
