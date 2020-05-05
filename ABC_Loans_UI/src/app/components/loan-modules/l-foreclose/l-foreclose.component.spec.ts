import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LForecloseComponent } from './l-foreclose.component';

describe('LForecloseComponent', () => {
  let component: LForecloseComponent;
  let fixture: ComponentFixture<LForecloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LForecloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LForecloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
