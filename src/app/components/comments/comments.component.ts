import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId;
  @Input('reviewId') reviewId;
  @Input('reviewer') reviewer;

  comments$: Observable<Comment[]>;
  username: string;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.username = this.userService.username;
    if(!this.username) this.subscription = this.userService.appUser$.subscribe(appUser => this.username = appUser.username);
    this.comments$ = this.commentService.getComments(this.bookId, this.reviewId);
  }

  async onPost(f: NgForm) {
    const comment = new Comment(this.username, f.value.text, new Date());
      await this.commentService.addComment(this.bookId, this.reviewId, comment);
      f.reset();
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
