import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanModulesComponent } from './loan-modules.component';

describe('LoanModulesComponent', () => {
  let component: LoanModulesComponent;
  let fixture: ComponentFixture<LoanModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
