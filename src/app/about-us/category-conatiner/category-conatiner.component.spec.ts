import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryConatinerComponent } from './category-conatiner.component';

describe('CategoryConatinerComponent', () => {
  let component: CategoryConatinerComponent;
  let fixture: ComponentFixture<CategoryConatinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryConatinerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryConatinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
