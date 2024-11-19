import { TestBed } from '@angular/core/testing';

import { InstructorViewGuard } from './instructor-view.guard';

describe('InstructorViewGuard', () => {
  let guard: InstructorViewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InstructorViewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
