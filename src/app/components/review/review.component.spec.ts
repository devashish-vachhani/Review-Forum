import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Review } from 'src/app/models/review';
import { By } from '@angular/platform-browser';
import { Comment } from '../../models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { of } from 'rxjs';
import { CommentsComponent } from '../comments/comments.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  const ReviewServiceStub = jasmine.createSpyObj<ReviewService>(
    'ReviewService', 
    {
      updateReview: Promise.resolve(),
    }
  );
  const UserServiceStub = {
    username: 'test',
  }
  const comments: Comment[] = [
    new Comment('commenter1', 'text1', new Date(), '1'),
    new Comment('commenter2', 'text2', new Date(), '2'),
];

  const CommentServiceStub = jasmine.createSpyObj<CommentService>(
    'CommentService',
    {
        getComments: of(comments),
        addComment: Promise.resolve(),
        deleteComment: Promise.resolve(),
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ReviewComponent,
        CommentsComponent, 
      ],
      providers: [
        { provide: ReviewService, useValue: ReviewServiceStub },
        { provide: UserService, useValue: UserServiceStub },
        { provide: CommentService, useValue: CommentServiceStub },
      ],
      imports: [
        FormsModule,
        MatSnackBarModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    component.bookId = '123',
    component.review = new Review('reviewer1', 'text1', new Date(), 3, [], '123');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLike on clicking like button', fakeAsync( () => {
    spyOn(component, 'onLike');

    const likeBtn = fixture.debugElement.query(By.css("[data-testid='like-btn']")).nativeElement;
    likeBtn.click()
    fixture.detectChanges();

    expect(component.onLike).toHaveBeenCalled();
  }));

  it('should pass input properties to comment component', () => {
    component.showComments = true;
    fixture.detectChanges();

    const commentComponents = fixture.debugElement.query(By.css('comments')).componentInstance;

    expect(commentComponents.bookId).toBe('123');
    expect(commentComponents.reviewId).toBe('123');
    expect(commentComponents.reviewer).toBe('reviewer1');
  });
});
