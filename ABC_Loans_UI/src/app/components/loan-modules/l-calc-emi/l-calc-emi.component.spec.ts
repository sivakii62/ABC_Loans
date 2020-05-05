import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LCalcEmiComponent } from './l-calc-emi.component';

describe('LCalcEmiComponent', () => {
  let component: LCalcEmiComponent;
  let fixture: ComponentFixture<LCalcEmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LCalcEmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LCalcEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
