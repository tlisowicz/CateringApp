import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { stringValidator } from '../shared/FormFieldsValidators';
import { Comment } from '../shared/comment';
import { DishFetchService } from '../services/dish-fetch.service';
import { FetchCommentsService } from '../services/fetch-comments.service';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.css']
})
export class AddCommentFormComponent {
  
  @Input() commentId:number = 10000;
  @Input() dishId:number = 10000;
  @Output() validComment: EventEmitter<Comment> = new EventEmitter<Comment>();

  constructor(
    private fb: FormBuilder) { }

  commentData = this.fb.group({
    author: ["login",[Validators.required, stringValidator(/^(?!\s*$).+/)]],
    rating: [0,Validators.required],
    date: [new Date()],
    comment: ['', [Validators.required, stringValidator(/^(?!\s*$).+/), 
                  Validators.maxLength(500), 
                  Validators.minLength(50)]
              ],
  });

  get author() { return this.commentData.get('author'); }
  get comment() { return this.commentData.get('comment'); }

  onSubmit() {
    if (this.commentData.invalid || this.commentData.value.rating == 0) {
      alert("Some fields have invalid values");
      return;
    }
    console.log(this.commentData.value);
    this.validComment.emit(this.makeComment());
    alert('Comment added!');
    this.commentData.reset();
    this.setInitialValues();

  }

  makeComment(): Comment {
    return {
      id: this.commentId as number,
      dishId: this.dishId as number,
      author: this.commentData.value.author as string,
      rating: this.commentData.value.rating as number,
      comment: this.commentData.value.comment as string,
      addedAt: this.commentData.value.date ? new Date().toISOString() : this.commentData.value.date!.toISOString(),
    }
  }

  setRating(rating: number) {
    if (rating == 0) {
      rating = 1;
    }
    this.commentData.patchValue({rating: rating});
  }
  setInitialValues() {
    this.commentData.setValue({
      author: "login",
      rating: 0,
      comment: '',
      date: new Date(),
    });
  }
}
