import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Dish } from '../shared/dish';
import { HttpClient } from '@angular/common/http';
import { OrderHistory } from '../shared/orderHistory';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  ROOT: string = 'http://localhost:3000/orderHistories';

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  getOrderHistory(username:string): Observable<OrderHistory[]> {
    return this.http.get<OrderHistory[]>(this.ROOT + '/' + username);
  }

  addToHistory(dishesWithQuantity: [Dish, number][], username: string, date: Date) {
    const uri = "/add";
    const path = this.ROOT + uri;
    return this.http.post<OrderHistory>(
      path, {dishes: dishesWithQuantity, username: username, date: date},
      {headers: 
        {'Content-Type': 'application/json'}, 
      });
  }
}
  


