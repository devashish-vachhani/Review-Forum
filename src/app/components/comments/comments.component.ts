import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId;
  @Input('reviewId') reviewId;
  @Input('reviewer') reviewer;

  comments: Comment[];
  username: string;
  subscription: Subscription;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.appUser$.pipe(
      switchMap(appUser => {
        this.username = appUser.username;
        return this.commentService.getComments(this.bookId, this.reviewId);
      })
    )
    .subscribe(comments => this.comments = comments);
  }

  async onPost(f: NgForm) {
    const comment = new Comment(this.username, f.value.text, new Date());
      await this.commentService.addComment(this.bookId, this.reviewId, comment);
      f.reset();
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
