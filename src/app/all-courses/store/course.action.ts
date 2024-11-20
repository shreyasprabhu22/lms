
import { createAction, props } from '@ngrx/store';

export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: any[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);

export const setSearchTerm = createAction(
  '[Course] Set Search Term',
  props<{ searchTerm: string }>()
);

export const setCategoryFilter = createAction(
  '[Course] Set Category Filter',
  props<{ category: string }>()
);

export const filterCourses = createAction('[Course] Filter Courses');
