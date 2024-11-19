import { Component, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Course } from 'src/app/interfaces/courseInterface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent {
  courses: Course[] = [];
  paginatedCourses: Course[] = [];
  pageSize = 5;
  pageIndex = 0;
  displayedColumns: string[] = ['select', 'courseId', 'name', 'category', 'price'];
  selection = new SelectionModel<Course>(true, []);
  currentUser: any = this.loginservice.get_currentUser();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private loginservice: LoginService
  ) { }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getDataByInstructor(this.loginservice.get_currentUser().instructorId).subscribe((data: Course[]) => {
      this.courses = data;
      this.updatePagination();
    });
  }
 
  updatePagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCourses = this.courses.slice(startIndex, endIndex);
    this.selection.clear();
  }

  onAddCourse() {
    this.router.navigate(['/create-course']);
  }

  onDeleteSelected() {
    const selectedCourses = this.selection.selected;
    if (selectedCourses.length > 0) {
      selectedCourses.forEach(course => {
        this.courseService.deleteData(course.course_id).subscribe(() => {
          this.courses = this.courses.filter(c => c.course_id !== course.course_id);
          this.updatePagination();
          this.selection.deselect(course);
        });
      });
    }
  }
  onUpdateSelected(){
    const selectedCourse = this.selection.selected
    console.log(selectedCourse)
    console.log(selectedCourse[0].course_id)
    this.router.navigate([`/update-course/${selectedCourse[0].course_id}`]); 
  }
  onSelectCourse(courseId: string, checked: boolean) {
    const course = this.courses.find(course => course.course_id === courseId);
    if (course) {
      if (checked) {
        this.selection.select(course);
      } else {
        this.selection.deselect(course);
      }
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.paginatedCourses.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.paginatedCourses.forEach(row => {
        this.selection.select(row);
      });
    }
  }
}
