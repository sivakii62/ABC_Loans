import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LLoanDetailsComponent } from './l-loan-details.component';

describe('LLoanDetailsComponent', () => {
  let component: LLoanDetailsComponent;
  let fixture: ComponentFixture<LLoanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LLoanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LLoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
