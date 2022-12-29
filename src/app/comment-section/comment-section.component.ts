import { Component, Input } from '@angular/core';
import { FetchCommentsService } from '../services/fetch-comments.service';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent {
  comments: Comment[] = [];
  @Input() dishId: number = 0;
  page = 1;

  constructor(private commentService: FetchCommentsService) { }

  ngOnInit(): void {
    this.commentService
        .getCommentsByDishId(this.dishId)
        .subscribe(comments => this.comments = comments);
  }

  addComment(comment: Comment) {
    this.commentService
        .addComment(comment)
        .subscribe(comment => {
          this.comments.push(comment)
          });

    console.log(this.comments);
  }
}
