import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input('bookId') bookId;
  @Input('reviewId') reviewId;
  @Input('reviewer') reviewer;
  @Input('appUser') appUser;

  constructor(
    private commentService: CommentService,
    private snackBar: MatSnackBar,
  ) {}
  comments$: Observable<Comment[]>;
  subscription: Subscription;

  ngOnInit(): void {
    this.comments$ = this.commentService.getComments(this.bookId, this.reviewId);
  }

  async onPost(f: NgForm) {
    const comment = new Comment(this.appUser.username, f.value.text, new Date());
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
}
