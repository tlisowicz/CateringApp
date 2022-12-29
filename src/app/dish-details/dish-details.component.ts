import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})

export class DishDetailsComponent implements OnInit {
  @Input() dish: Dish = {} as Dish;
  @Input() currentlyAvaliable: number = 0;

  constructor(private router:Router, private activatedRoute:ActivatedRoute) {
   }
  
  ngOnInit(): void {
    this.dish = history.state.dish;
    this.currentlyAvaliable = history.state.currentlyAvaliable;
  }
}
