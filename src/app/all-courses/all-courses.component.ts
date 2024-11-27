import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseState } from './store/course.reducer';
import * as CourseActions from './store/course.action';
import { selectFilteredCourses, selectAllCourses, selectSearchTerm, selectSelectedCategory } from './store/course.selectors';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

interface Course {
  id: number;
  name: string;
  description: string;
  category: string;
  instructor_id: number;
}

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  filteredCourses$!: Observable<Course[] | null>;
  allCourses$!: Observable<Course[]>;
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  user:any;
  role:string=""
  constructor(private store: Store<CourseState>,
    private loginservice:LoginService
  ) {
    this.role=this.loginservice.get_role();
    this.user= this.loginservice.get_currentUser()
   
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
    this.filteredCourses$ = new Observable<Course[] | null>((observer) => observer.next(null)); 
    this.allCourses$ = this.store.select(selectAllCourses);

    this.allCourses$.subscribe(courses => {
      this.categories = Array.from(new Set(courses.map(course => course.category)));
    });
    
  }

  searchCourses(): void {
    this.store.dispatch(CourseActions.setSearchTerm({ searchTerm: this.searchTerm }));
    this.store.dispatch(CourseActions.filterCourses());
    this.filteredCourses$ = this.store.select(selectFilteredCourses);
  }

  filterCourses(): void {
    this.store.dispatch(CourseActions.setCategoryFilter({ category: this.selectedCategory }));
    this.store.dispatch(CourseActions.filterCourses());
    this.filteredCourses$ = this.store.select(selectFilteredCourses);
  }

  clearFilters(): void {
    this.store.dispatch(CourseActions.setSearchTerm({ searchTerm: '' }));
    this.store.dispatch(CourseActions.setCategoryFilter({ category: '' }));
    this.store.dispatch(CourseActions.filterCourses());
    this.filteredCourses$ = new Observable<Course[] | null>((observer) => observer.next(null));
  }

  getCategories(): string[] {
    return this.categories;
  }

  getAllCoursesByCategory(category: string): Observable<Course[]> {
    return this.allCourses$.pipe(
      map((courses: Course[]) => courses.filter(course => course.category === category))
    );
  }
}
