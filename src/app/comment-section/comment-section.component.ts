import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { Comment } from '../shared/comment';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent {
  comments: Comment[] = [];
  dishId: number = 0;
  page = 1;
  canAddComment: boolean = false;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.dishId = this.route.snapshot.params['id'];
    this.commentService
        .getCommentsByDishId(this.dishId)
        .subscribe(comments => {
          this.comments = comments;
          this.comments.sort((a,b) => {
            return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
          })
        });

    this.auth.userState.subscribe(userState => {
      if (userState) {
        const userRole = userState.role;
        if (userRole == 'admin' || userRole == 'dishManager') {
          this.canAddComment = true;
          return;
        }
        const username = userState.username;
        this.commentService.canUserAddComment(this.dishId, username)
        this.commentService.privilegedToAdd
        .subscribe(canAdd => {
          this.canAddComment = canAdd;
        });
      }
      else {
        this.canAddComment = false;
      }
    });
  }

  addComment(comment: Comment) {
    this.commentService
    .addComment(comment)
    .subscribe({
      next: () => this.comments.unshift(comment),
      error: (err) => console.log(err)
    })
    this.commentService.canUserAddComment(this.dishId, comment.author);
  }
}
