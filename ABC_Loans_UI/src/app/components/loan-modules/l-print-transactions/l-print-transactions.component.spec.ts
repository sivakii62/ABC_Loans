import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LPrintTransactionsComponent } from './l-print-transactions.component';

describe('LPrintTransactionsComponent', () => {
  let component: LPrintTransactionsComponent;
  let fixture: ComponentFixture<LPrintTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LPrintTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LPrintTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
