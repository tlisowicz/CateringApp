import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { stringValidator } from '../shared/FormFieldsValidators';
import { Comment } from '../shared/comment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.css']
})
export class AddCommentFormComponent {
  
  dishId: number = 0;
  @Output() validComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  username: string = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,) 
    {
      this.dishId = this.route.snapshot.params['id'];
      this.authService.userState.subscribe(userState => {
        if (userState) {
          this.username = userState.username;
          this.commentData.patchValue({author: this.username});
        } else {
          this.username = "";
        }
      });
    }

  commentData = this.fb.group({
    author: [this.username,[Validators.required, stringValidator(/^(?!\s*$).+/)]],
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
    this.validComment.emit(this.makeComment());
    alert('Comment added!');
    this.commentData.reset();
    this.setInitialValues();

  }

  makeComment(): Comment {
    return {
      dishId: Number(this.dishId) as number,
      author: this.commentData.value.author as string,
      rating: this.commentData.value.rating as number,
      comment: this.commentData.value.comment as string,
      addedAt: this.commentData.value.date ? new Date().toJSON().slice(0,10).replace(/-/g,'/') : this.commentData.value.date!.toJSON().slice(0,10).replace(/-/g,'/') ,
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
      author: this.username,
      rating: 0,
      comment: '',
      date: new Date(),
    });
  }
}
