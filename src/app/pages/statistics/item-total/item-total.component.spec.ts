import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTotalComponent } from './item-total.component';

describe('ItemTotalComponent', () => {
  let component: ItemTotalComponent;
  let fixture: ComponentFixture<ItemTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
