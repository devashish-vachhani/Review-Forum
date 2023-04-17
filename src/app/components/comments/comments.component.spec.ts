import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { By } from '@angular/platform-browser';
import { Comment } from '../../models/comment';
import { of } from 'rxjs';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
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
      declarations: [ CommentsComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: CommentService, useValue: CommentServiceStub },
        { provide: UserService, useValue: UserServiceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    component.bookId = '123'
    component.reviewId = '123'
    component.reviewer = 'John Doe'
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
    spyOn(component, 'onPost').and.callThrough();

    const text = 'This is a comment.'
    const comment: Comment = new Comment('test', text, new Date());
    const textarea = fixture.debugElement.query(By.css('#text')).nativeElement;
    const postBtn = fixture.debugElement.query(By.css('[data-testid="post-btn"]')).nativeElement

    textarea.value = text;
    textarea.dispatchEvent(new Event('input'));
    postBtn.click();
    fixture.detectChanges();
    tick(200);

    expect(component.onPost).toHaveBeenCalled();
    expect(CommentServiceStub.addComment).toHaveBeenCalledWith('123', '123', comment);
  }));
});
