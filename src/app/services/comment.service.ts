import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../shared/comment';
import { COMMENTS } from '../shared/mock-comments';
import { DishService } from './dish.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: Comment[] = [];
  ROOT: string = "http://localhost:3000";
  constructor(
    private dishService: DishService,
    private http: HttpClient
  ) 
  {
  this.comments = COMMENTS;
  }

  getComments(): Observable<Comment[]> {
    const URI = "/comments";
    const route = this.ROOT + URI;
    return this.http.get<Comment[]>(route);
  }

  getCommentsByDishId(dishID: number):Observable<Comment[]> {
    const URI = `/comments/byDish/${dishID}`;
    const route = this.ROOT + URI;
    return this.http.get<Comment[]>(route);
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

  addComment(comment: Comment): Observable<Comment> {
    const URI = "/comments/new";
    const path = this.ROOT + URI;
    return this.http
      .post<Comment>(
        path, 
        comment, 
        {headers: {'Content-Type': 'application/json'}}
      );
  }
}
