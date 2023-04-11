import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input('bookId') bookId;
  @Input('review') review;
  @Input('username') username;

  comments$: Observable<Comment[]>;
  subscription: Subscription;

  constructor(
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.comments$ = this.commentService.getComments(this.bookId, this.review.id);
  }

  async onPost(f: NgForm) {
    const comment = new Comment(this.username, f.value.text, new Date());
      await this.commentService.addComment(this.bookId, this.review.id, comment);
      f.reset();
  }
}
