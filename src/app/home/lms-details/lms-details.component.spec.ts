import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsDetailsComponent } from './lms-details.component';

describe('LmsDetailsComponent', () => {
  let component: LmsDetailsComponent;
  let fixture: ComponentFixture<LmsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
