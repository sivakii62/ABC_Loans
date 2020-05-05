import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LShowBalComponent } from './l-show-bal.component';

describe('LShowBalComponent', () => {
  let component: LShowBalComponent;
  let fixture: ComponentFixture<LShowBalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LShowBalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LShowBalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
