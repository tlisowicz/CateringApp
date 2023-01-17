import { Injectable } from '@angular/core';
import { concat, map, Observable, firstValueFrom, lastValueFrom, of, BehaviorSubject } from 'rxjs';
import { Comment } from '../shared/comment';
import { COMMENTS } from '../shared/mock-comments';
import { DishService } from './dish.service';
import { HttpClient } from '@angular/common/http';
import { OrderHistoryService } from './order-history.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  ROOT: string = "http://localhost:3000";
  privilegedToAdd: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private dishService: DishService,
    private historyService: OrderHistoryService,
    private http: HttpClient,
    private auth: AuthService)
  {
    this.auth.userState.subscribe((state) => {
      if (state) {
        if (state.roles.includes("admin")) {
        }
        this.privilegedToAdd.next(true);
      } else {
        this.privilegedToAdd.next(false);
      }
    });
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

  
  async recalculateAvarageRating(dishID: number, newCommentRating: number): Promise<number> {
    let result = 0;
    const dish = await  firstValueFrom(this.dishService.getDish(dishID));
    const rating = dish.avarageRating;
    if (rating === null) {
      result = newCommentRating;
      return result;
    }
    const comments = await firstValueFrom(this.getComments());
    const ratingsForThisDish = comments.filter(comment => comment.dishId === dishID).map(comment => comment.rating);
    const commentsCount = ratingsForThisDish.length;
    const newAvarageRating = (ratingsForThisDish.reduce((prev, current) => prev + current, 0) + newCommentRating)/ (commentsCount+1);
    result = newAvarageRating;
    return result;
  }

  addComment(comment: Comment): Observable<Comment> {
    const URI = "/comments/new";
    const path = this.ROOT + URI;
    this.recalculateAvarageRating(comment.dishId, comment.rating).then(rating => {
      this.dishService.updateRating(comment.dishId, rating).subscribe()
    });

    return this.http
      .post<Comment>(
        path, 
        comment, 
        {headers: {'Content-Type': 'application/json'}}
      );
  }

  async checkCoditions(dishID: number, username: string): Promise<boolean> {
    const comments = await firstValueFrom(this.getCommentsByDishId(dishID));
    const userComment = comments.filter(comment => comment.author === username);
    const addedComment = userComment.length > 0;
    const orderHistory = await firstValueFrom(this.historyService.getOrderHistory(username));
    const userBoughtDish = orderHistory.some(order => order.dishes.some(dish => dish[0].id == dishID));
    return userBoughtDish && !addedComment;
  }

  canUserAddComment(dishID: number, username: string) {
    this.checkCoditions(dishID, username).then(result => {
      this.privilegedToAdd.next(result);
    });
  }
}
