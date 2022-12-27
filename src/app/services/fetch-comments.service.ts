import { Injectable } from '@angular/core';
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

  getComments(): Comment[] {
    return this.comments;
  }

  getCommentsByDishId(dishID: number): Comment[] {
    return this.comments.filter(comment => comment.dishId === dishID);
  }

  getComment(id: number): Comment | undefined {
    return this.comments.find(comment => comment.id === id);
  }
  
  getAvarageRating(dishID: number) {
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

  getRating(dishID: number, author: string | null) {
    return this.comments.find(comment => comment.dishId === dishID && comment.author === author)?.rating;
  }
}
