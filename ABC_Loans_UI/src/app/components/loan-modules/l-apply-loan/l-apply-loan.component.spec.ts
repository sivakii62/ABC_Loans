import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LApplyLoanComponent } from './l-apply-loan.component';

describe('LApplyLoanComponent', () => {
  let component: LApplyLoanComponent;
  let fixture: ComponentFixture<LApplyLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LApplyLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LApplyLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
