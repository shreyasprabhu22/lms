import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CourseService } from '../../services/course.service';
import * as CourseActions from './course.action';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CourseEffects {
  constructor(private actions$: Actions, private courseService: CourseService) {}

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      mergeMap(() =>
        this.courseService.getData().pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ courses })),
          catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
        )
      )
    )
  );
}
