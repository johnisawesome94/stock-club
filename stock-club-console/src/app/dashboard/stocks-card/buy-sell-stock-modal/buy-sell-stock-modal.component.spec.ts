import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellStockModalComponent } from './buy-sell-stock-modal.component';

describe('AddStockModalComponent', () => {
  let component: BuySellStockModalComponent;
  let fixture: ComponentFixture<BuySellStockModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySellStockModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellStockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
