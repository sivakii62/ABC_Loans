import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LHomeComponent } from './l-home.component';

describe('LHomeComponent', () => {
  let component: LHomeComponent;
  let fixture: ComponentFixture<LHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
