import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LPaymentComponent } from './l-payment.component';

describe('LPaymentComponent', () => {
  let component: LPaymentComponent;
  let fixture: ComponentFixture<LPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
