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

  constructor(private commentService: FetchCommentsService) { }

  ngOnInit(): void {
    this.comments = this.commentService.getCommentsByDishId(this.dishId);
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
    console.log(this.comments);
  }
}
