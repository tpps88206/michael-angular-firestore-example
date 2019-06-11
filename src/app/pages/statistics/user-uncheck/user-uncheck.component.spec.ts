import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUncheckComponent } from './user-uncheck.component';

describe('UserUncheckComponent', () => {
  let component: UserUncheckComponent;
  let fixture: ComponentFixture<UserUncheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUncheckComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUncheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
