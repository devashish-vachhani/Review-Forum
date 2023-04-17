import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchComponent } from './book-search.component';
import { University } from 'src/app/models/university';
import { UniversityService } from 'src/app/services/university.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from "@angular/material/select/testing";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('BookSearchFormComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let router: Router;
  let loader: HarnessLoader;
  const universities: University[] = [
    { id: '1', name: 'uni1', code: 'u1', courses: ['c1', 'c2'] },
    { id: '2', name: 'uni2', code: 'u2', courses: ['c3','c4'] }
]
  const UniversityServiceStub = jasmine.createSpyObj<UniversityService>(
    'UniversityService',
    {
        getUniversities: of(universities),
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSearchComponent ],
      providers: [
        { provide: UniversityService, useValue: UniversityServiceStub },
      ],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSearchComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct search modes', async () => {
    const searchMode = await loader.getHarness(MatSelectHarness.with({selector: "[data-testid='search-mode']"}));
    await searchMode.open();
    const options = await searchMode.getOptions();
    expect(options.length).toBe(2);
    expect(await options[0].getText()).toMatch("Title");
    expect(await options[1].getText()).toMatch("University");
  });

  it('should set search mode to byUniversity when University is selected', async () => {
    const searchMode = await loader.getHarness(MatSelectHarness.with({selector: "[data-testid='search-mode']"}));
    await searchMode.clickOptions({ text: "University" });
    expect(component.searchMode).toEqual('byUniversity')
  });

  it('should redirect to /books with queryParams on clicking submit', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const routerSpy = spyOn(router, 'navigate');

    component.searchMode = 'byTitle';
    component.searchTerm = 'code';
    fixture.detectChanges();
    const searchBtn = fixture.debugElement.query(By.css("[data-testid='search-btn']")).nativeElement;
    searchBtn.click();
    fixture.detectChanges();
    
    expect(component.onSubmit).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/books'], Object({ queryParams: Object({ title: 'code' }), queryParamsHandling: 'merge' }));
  })
});
