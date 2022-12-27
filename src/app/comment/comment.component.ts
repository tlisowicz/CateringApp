import { Component, Input } from '@angular/core';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment: Comment = {} as Comment;
}
