import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LPayEmiComponent } from './l-pay-emi.component';

describe('LPayEmiComponent', () => {
  let component: LPayEmiComponent;
  let fixture: ComponentFixture<LPayEmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LPayEmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LPayEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
