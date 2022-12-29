import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { stringValidator } from '../shared/dishFieldsValidators';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.css']
})
export class AddCommentFormComponent {
  
  @Input() commentId:number = 10000;
  @Input() dishId:number = 10000;
  @Output() validComment: EventEmitter<Comment> = new EventEmitter<Comment>();

  constructor(private fb: FormBuilder) { }

  commentData = this.fb.group({
    author: ['',[Validators.required, stringValidator(/^(?!\s*$).+/)]],
    rating: [0,Validators.required],
    comment: ['', [Validators.required, stringValidator(/^(?!\s*$).+/)]],
  });

  get author() { return this.commentData.get('author'); }
  get comment() { return this.commentData.get('comment'); }

  onSubmit() {
    if (this.commentData.invalid) {
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
      addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
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
      author: '',
      rating: 0,
      comment: '',
    });
  }
}
