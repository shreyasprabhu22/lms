import { createReducer, on } from '@ngrx/store';
import * as CourseActions from './course.action';

export interface CourseState {
  courses: any[];
  filteredCourses: any[];
  searchTerm: string;
  selectedCategory: string;
}

export const initialState: CourseState = {
  courses: [],
  filteredCourses: [],
  searchTerm: '',
  selectedCategory: '',
};

export const courseReducer = createReducer(
  initialState,
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    filteredCourses: courses,
  })),
  on(CourseActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(CourseActions.setCategoryFilter, (state, { category }) => ({
    ...state,
    selectedCategory: category,
  })),
  on(CourseActions.filterCourses, (state) => {
    let filtered = state.courses;

    
    if (state.searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

   
    if (state.selectedCategory) {
      filtered = filtered.filter(course =>
        course.category === state.selectedCategory
      );
    }

    return {
      ...state,
      filteredCourses: filtered,
    };
  })
);
