import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LDepositComponent } from './l-deposit.component';

describe('LDepositComponent', () => {
  let component: LDepositComponent;
  let fixture: ComponentFixture<LDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
