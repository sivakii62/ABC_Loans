import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LEditProfileComponent } from './l-edit-profile.component';

describe('LEditProfileComponent', () => {
  let component: LEditProfileComponent;
  let fixture: ComponentFixture<LEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
