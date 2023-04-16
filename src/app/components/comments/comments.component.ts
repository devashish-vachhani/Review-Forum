import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId;
  @Input('reviewId') reviewId;
  @Input('reviewer') reviewer;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
  ) {}
  comments$: Observable<Comment[]>;
  username: string;
  subscription: Subscription;

  ngOnInit(): void {
    this.username = this.userService.username;
    if(!this.username) this.subscription = this.userService.appUser$.subscribe(appUser => this.username = appUser.username);
    this.comments$ = this.commentService.getComments(this.bookId, this.reviewId);
  }

  async onPost(f: NgForm) {
    const comment = new Comment(this.username, f.value.text, new Date());
    try {
      await this.commentService.addComment(this.bookId, this.reviewId, comment);
      this.snackBar.open('Comment posted', 'Dismiss', {
        panelClass: 'success',
        duration: 5000,
      })
      f.reset();
    }
    catch(error) {
      this.snackBar.open(error, 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
    }
      
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
