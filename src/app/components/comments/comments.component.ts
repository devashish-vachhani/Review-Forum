import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input('bookId') bookId;
  @Input('reviewId') reviewId;
  @Input('reviewer') reviewer;

  comments$: Observable<Comment[]>
  username: string;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.username = this.userService.username;
    this.comments$ = this.commentService.getComments(this.bookId, this.reviewId);
  }

  async onPost(f: NgForm) {
    const comment = new Comment(this.username, f.value.text, new Date());
    await this.commentService.addComment(this.bookId, this.reviewId, comment);
    f.reset();
  }
}
