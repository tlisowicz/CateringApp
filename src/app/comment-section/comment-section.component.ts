import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent {
  comments: Comment[] = [];
  dishId: number = 0;
  page = 1;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dishId = this.route.snapshot.params['id'];
    this.commentService
        .getCommentsByDishId(this.dishId)
        .subscribe(comments => this.comments = comments);
  }

  addComment(comment: Comment) {
    this.comments.unshift(comment);
    this.commentService
        .addComment(comment)
        .subscribe()
  }
}
