import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwBlogComponent } from './veiw-blog.component';

describe('VeiwBlogComponent', () => {
  let component: VeiwBlogComponent;
  let fixture: ComponentFixture<VeiwBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiwBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
