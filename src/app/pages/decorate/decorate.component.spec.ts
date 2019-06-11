import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorateComponent } from './decorate.component';

describe('DecorateComponent', () => {
  let component: DecorateComponent;
  let fixture: ComponentFixture<DecorateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
