import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFundsModalComponent } from './add-funds-modal.component';

describe('AddFundsModalComponent', () => {
  let component: AddFundsModalComponent;
  let fixture: ComponentFixture<AddFundsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFundsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFundsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
