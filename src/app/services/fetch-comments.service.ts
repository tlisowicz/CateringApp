import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../shared/comment';
import { COMMENTS } from '../shared/mock-comments';
import { DishFetchService } from './dish-fetch.service';
@Injectable({
  providedIn: 'root'
})
export class FetchCommentsService {

  comments: Comment[] = [];

  constructor(private dishService: DishFetchService) {
    this.comments = COMMENTS;
   }

  getComments(): Observable<Comment[]> {
    return of(this.comments);
  }

  getCommentsByDishId(dishID: number):Observable<Comment[]> {
    return of(this.comments.filter(comment => comment.dishId === dishID));
  }

  getComment(id: number): Observable<Comment | undefined> {
    return of(this.comments.find(comment => comment.id === id));
  }
  
  recalculateAvarageRating(dishID: number, newRating: number): number {
    //TODO: poprawić
    let result = 0;
    this.dishService.getDish(dishID).subscribe(dish => {
      const rating = dish.avarageRating;
      if (rating === null) {
        result = newRating;
      }
      this.getComments().subscribe(comments => {
        const commentsCount = comments.filter(comment => comment.dishId === dishID).length;
        const newAvarageRating = (rating! * (commentsCount - 1) + newRating) / commentsCount;
        result = newAvarageRating;
      });
    });
    return 0; //PLACEDHOLDER
  }

  getRating(dishID: number, author: string | null): number | undefined {
    return this.comments.find(comment => comment.dishId === dishID && comment.author === author)?.rating;
  }

  addComment(comment: Comment): Observable<Comment> {
    console.log(comment);
    this.comments.push(comment);
    const rating = this.recalculateAvarageRating(comment.dishId, comment.rating);
    this.dishService.updateRating(comment.dishId, rating).subscribe();
    return of(comment);

  }
}
