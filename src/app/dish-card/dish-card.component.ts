import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit{

  @Input() dish: Dish = {} as Dish;
  currentlyAvaliable: number = 0;
  selected: number = 0;

  constructor(private router: Router) {  }

  ngOnInit() {
    this.currentlyAvaliable = this.dish?.servingsPerDay;
  }

  increment(event: any) {
    event.stopPropagation();
    if (this.currentlyAvaliable) {
      this.currentlyAvaliable--;
      this.selected++;
      console.log("clicked");
    }
  }

  decrement(event: any) {
    event.stopPropagation();
    if (this.currentlyAvaliable !== undefined) {
      if ( this.selected > 0) {
        this.currentlyAvaliable++;
        this.selected--;
      }
    }
  }

  gotoDishDetails(id: number) {
    this.router.navigateByUrl('/dish-details/'+id, { state: { dish: this.dish }});
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }
}
