import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CoursesService } from 'src/app/services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  currentUser: any = "";
  coursesTakenByUser: any[] = [];

  constructor(private userService: UsersService, private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) {
      this.coursesService.getCourses().subscribe(courses => {
        this.getCoursesForUser(courses, this.currentUser.CoursesTaken);
      });
    }
  }

  
  getCoursesForUser(courses: any[], courseIds: string[]) {
    this.coursesTakenByUser = courseIds.map(courseId => {
      return courses.find(course => course.CourseID === courseId);
    }).filter(course => course !== undefined); 
  }

  upgrade(){
    if (this.currentUser) {
      this.userService.updateUserSubscription('Enterprise').subscribe(
        updatedUser => {
          this.currentUser = updatedUser; 
          alert("Your plan is upgraded to Enterprise plan");
        },
        error => {
          console.error('Error upgrading subscription:', error);
          alert("There was an error upgrading your subscription.");
        }
      );
    } else {
      alert("You need to be logged in to upgrade your subscription.");
    }
  }
}
