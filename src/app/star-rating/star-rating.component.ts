import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FetchCommentsService } from '../services/fetch-comments.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {

  @Input() readonly: boolean = true;
  @Input() showAvarage: boolean = false;
  @Input() dishID: number = 0;
  @Input() author: string | null = null;
  @Input() starSize:number = 40;
  @Output() rateChagne: EventEmitter<number> = new EventEmitter<number>();

  rating: number = 0;
  avarageRating: number = 0;
  constructor(private commentService: FetchCommentsService) {

   }

   ngOnInit(): void {
    this.avarageRating = this.commentService.getAvarageRating(this.dishID);
    this.rating = this.commentService.getRating(this.dishID, this.author) ?? 0;
    console.log("Rating Works but now it fetches value from file so it is not dynamic");
   }

  rateChange() {
    this.rateChagne.emit(this.rating);
  }
}
