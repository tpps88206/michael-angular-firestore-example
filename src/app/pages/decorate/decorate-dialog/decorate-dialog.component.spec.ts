import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorateDialogComponent } from './decorate-dialog.component';

describe('DecorateDialogComponent', () => {
  let component: DecorateDialogComponent;
  let fixture: ComponentFixture<DecorateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
