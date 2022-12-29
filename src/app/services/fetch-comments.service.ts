import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../shared/comment';
import { COMMENTS } from '../shared/mock-comments';
@Injectable({
  providedIn: 'root'
})
export class FetchCommentsService {

  comments: Comment[] = [];

  constructor() {
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
  
  getAvarageRating(dishID: number): number {
    let sum = 0;
    let count = 0;
    this.comments.forEach(comment => {
      if (comment.dishId === dishID) {
        sum += comment.rating;
        count++;
      }
    });
    if (count === 0){ return 0; }
    return sum / count;    
  }

  getRating(dishID: number, author: string | null): number | undefined {
    return this.comments.find(comment => comment.dishId === dishID && comment.author === author)?.rating;
  }

  addComment(comment: Comment): Observable<Comment> {
    this.comments.push(comment);
    return of(comment);

  }
}
