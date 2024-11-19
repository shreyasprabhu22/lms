import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwCourseComponent } from './veiw-course.component';

describe('VeiwCourseComponent', () => {
  let component: VeiwCourseComponent;
  let fixture: ComponentFixture<VeiwCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiwCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
