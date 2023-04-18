import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { By } from '@angular/platform-browser';
import { Comment } from '../../models/comment';
import { of } from 'rxjs';
import { AppUser } from 'src/app/models/user';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let comments: Comment[] = [
    new Comment('commenter1', 'text1', new Date(), '1'),
    new Comment('commenter2', 'text2', new Date(), '2'),
  ];
  let appUser = new AppUser('email1', 'username1', false, '1');
  let commentServiceSpy: jasmine.SpyObj<CommentService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    commentServiceSpy = jasmine.createSpyObj('CommentService', ['getComments', 'addComment']);
    commentServiceSpy.getComments.and.returnValue(of(comments));
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ CommentsComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: CommentService, useValue: commentServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    component.bookId = '123';
    component.reviewId = '123';
    component.reviewer = 'John Doe';
    component.appUser = appUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of comments', () => {
    const commentElements = fixture.debugElement.queryAll(By.css('[data-testid="comment-container"]'));

    expect(commentElements.length).toEqual(2);
  });

  it('should post a comment', fakeAsync(() => {
    commentServiceSpy.addComment.and.returnValue(Promise.resolve());
    spyOn(component, 'onPost').and.callThrough();
    const success = 'Comment posted';

    const text = 'This is a comment.'
    const comment: Comment = new Comment('username1', text, new Date());
    const textarea = fixture.debugElement.query(By.css('#text')).nativeElement;
    const postBtn = fixture.debugElement.query(By.css('[data-testid="post-btn"]')).nativeElement

    textarea.value = text;
    textarea.dispatchEvent(new Event('input'));
    postBtn.click();
    fixture.detectChanges();
    tick(200);

    expect(component.onPost).toHaveBeenCalled();
    expect(commentServiceSpy.addComment).toHaveBeenCalledWith('123', '123', comment);
    expect(snackBarSpy.open).toHaveBeenCalledWith(success, 'Dismiss', Object({ panelClass: 'success', duration: 5000 }));
  }));

  it('should handle error if service could not add comment', fakeAsync( () => {
    const error = 'error';
    commentServiceSpy.addComment.and.returnValue(Promise.reject(error));
    spyOn(component, 'onPost').and.callThrough();

    const text = 'This is a comment.'
    const comment: Comment = new Comment('username1', text, new Date());
    const textarea = fixture.debugElement.query(By.css('#text')).nativeElement;
    const postBtn = fixture.debugElement.query(By.css('[data-testid="post-btn"]')).nativeElement

    textarea.value = text;
    textarea.dispatchEvent(new Event('input'));
    postBtn.click();
    fixture.detectChanges();
    tick(200);

    expect(component.onPost).toHaveBeenCalled();
    expect(commentServiceSpy.addComment).toHaveBeenCalledWith('123', '123', comment);
    expect(snackBarSpy.open).toHaveBeenCalledWith(error, 'Dismiss', Object({ panelClass: 'error', duration: 5000 }));
  }));
});
