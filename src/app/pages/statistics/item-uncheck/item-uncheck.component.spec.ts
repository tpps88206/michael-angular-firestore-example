import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUncheckComponent } from './item-uncheck.component';

describe('ItemUncheckComponent', () => {
  let component: ItemUncheckComponent;
  let fixture: ComponentFixture<ItemUncheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemUncheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUncheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
