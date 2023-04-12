import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookRequestsComponent } from './admin-book-requests.component';

describe('BookRequestsComponent', () => {
  let component: AdminBookRequestsComponent;
  let fixture: ComponentFixture<AdminBookRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBookRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBookRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
