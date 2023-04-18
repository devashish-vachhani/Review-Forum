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
  const userServiceStub = {
    username: 'test',
  }
  const comments: Comment[] = [
    new Comment('commenter1', 'text1', new Date(), '1'),
    new Comment('commenter2', 'text2', new Date(), '2'),
  ];
  let reviewServiceSpy: jasmine.SpyObj<ReviewService>;
  let commentServiceSpy: jasmine.SpyObj<CommentService>;

  beforeEach(async () => {
    reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['updateReview']);
    commentServiceSpy = jasmine.createSpyObj('CommentService', ['getComments', 'addComment', 'deleteComment']);
    commentServiceSpy.getComments.and.returnValue(of(comments));

    await TestBed.configureTestingModule({
      declarations: [ 
        ReviewComponent,
        CommentsComponent, 
      ],
      providers: [
        { provide: ReviewService, useValue: reviewServiceSpy },
        { provide: UserService, useValue: userServiceStub },
        { provide: CommentService, useValue: commentServiceSpy },
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

  it('should call onDislike on clicking on a liked review', fakeAsync( () => {
    spyOn(component, 'onDislike');

    component.review.likes.push('test');
    fixture.detectChanges();

    const dislikeBtn = fixture.debugElement.query(By.css("[data-testid='dislike-btn']")).nativeElement;
    dislikeBtn.click()
    fixture.detectChanges();

    expect(component.onDislike).toHaveBeenCalled();
  }));

  it('should toggle comments on clicking comment button', () => {
    component.showComments = false;
    fixture.detectChanges();

    const toggleCommentsBtn = fixture.debugElement.query(By.css("[data-testid='toggle-comments-btn']")).nativeElement;
    toggleCommentsBtn.click()
    fixture.detectChanges();

    expect(component.showComments).toBe(true);
  })

  it('should not render comment component if showComments is false', () => {
    const commentsComponent = fixture.nativeElement.querySelector('comments');
    expect(commentsComponent).toBeFalsy();
  });

  it('should render and pass input properties to comment component if showComments is true', () => {
    component.showComments = true;
    fixture.detectChanges();

    const commentsComponent = fixture.debugElement.query(By.css('comments')).componentInstance;

    expect(commentsComponent.bookId).toBe('123');
    expect(commentsComponent.reviewId).toBe('123');
    expect(commentsComponent.reviewer).toBe('reviewer1');
  });
});
