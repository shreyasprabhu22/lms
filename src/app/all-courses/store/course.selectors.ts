// course.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

export const selectCourseState = createFeatureSelector<CourseState>('course');

export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses
);

export const selectFilteredCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.filteredCourses
);

export const selectSearchTerm = createSelector(
  selectCourseState,
  (state: CourseState) => state.searchTerm
);

export const selectSelectedCategory = createSelector(
  selectCourseState,
  (state: CourseState) => state.selectedCategory
);
