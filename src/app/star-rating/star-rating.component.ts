import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {

  @Input() readonly: boolean = true;
  @Input() dishID: number = 0;
  @Input() author: string | null = null;
  @Input() starSize:number = 40;
  @Input() initialRating: number | null = 0;
  @Output() rateChagne: EventEmitter<number> = new EventEmitter<number>();

  rating: number = 0;
  constructor() {

   }

   ngOnInit(): void {
    this.initialRating === null ? this.rating = 0 : this.rating = this.initialRating;
   }

  rateChange() {
    this.rateChagne.emit(this.rating);
  }
}
