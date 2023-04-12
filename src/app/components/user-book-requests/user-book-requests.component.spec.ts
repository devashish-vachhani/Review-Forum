import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookRequestsComponent } from './user-book-requests.component';

describe('MyRequestsComponent', () => {
  let component: UserBookRequestsComponent;
  let fixture: ComponentFixture<UserBookRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
