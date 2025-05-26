import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPendingComponent } from './checkout-pending.component';

describe('CheckoutPendingComponent', () => {
  let component: CheckoutPendingComponent;
  let fixture: ComponentFixture<CheckoutPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
