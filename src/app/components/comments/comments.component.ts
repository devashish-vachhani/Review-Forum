import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { UserService } from 'src/app/services/user.service';

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
  username: string = this.userService.username;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.comments$ = this.commentService.getComments(this.bookId, this.reviewId);
  }

  async onPost(f) {
    const comment = new Comment(this.username, f.text, new Date())
    await this.commentService.addComment(this.bookId, this.reviewId, comment);
  }
}
