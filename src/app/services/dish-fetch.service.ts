import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/mock-dishes';


@Injectable({
  providedIn: 'root'
})

export class DishFetchService {

  dishes: Dish[];
  ROOT = "http://localhost:3000";

  constructor( private http: HttpClient) {
    this.dishes = DISHES;
  }

  getDishes(): Observable<Dish[]> {
    const uri = "/dishes";
    const route = this.ROOT + uri;
    const dishes: Observable<Dish[]>  =  this.http.get<Dish[]>(route);
    return dishes;
  }

  getDish(id: number): Observable<Dish> {
    const uri = `/dishes/${id}`;
    const route = this.ROOT + uri;
    return this.http.get<Dish>(route);
  }

  getLastDishID(): Observable<number> {
    const uri = "/dishes/lastID";
    const route = this.ROOT + uri;
    return this.http.get<number>(route);
  }

  addDish(dish: Dish): Observable<Dish> {
    const uri = "/dishes/new";
    const route = this.ROOT + uri;
    console.log(dish);
    return this.http.post<Dish>(route, dish, {headers: {'Content-Type': 'application/json'}});
  }
  
  deleteDish(dishID: number): Observable<Dish> {
    const uri = `/dishes/${dishID}`;
    const route = this.ROOT + uri;
    return this.http.delete<Dish>(route);
  }

  updateRating(dishId: number, rating: number): Observable<Dish> {
    const uri = `/dishes/${dishId}`;
    const route = this.ROOT + uri;
    return this.http.patch<Dish>(route, {avarageRating: rating}, {headers: {'Content-Type': 'application/json'}});

  }
  updateDishQuantity(dish: [Dish, number]): Observable<Dish> {
    const uri = `/dishes/${dish[0].id}`;
    const route = this.ROOT + uri;
    return this.http.patch<Dish>(route, {servingsPerDay: dish[1]}, {headers: {'Content-Type': 'application/json'}});
  }
}