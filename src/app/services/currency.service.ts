import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currency: BehaviorSubject<string>;

  constructor() { 
    this.currency = new BehaviorSubject<string>("EUR");
  }

  setCurrency(currency: string) {
    this.currency.next(currency);
  }
}
