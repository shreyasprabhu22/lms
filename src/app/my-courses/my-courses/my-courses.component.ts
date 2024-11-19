import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/interfaces/userInterface';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  currentUser: any = {};
  coursesTakenByUser: any[] = [];

  constructor(private userservice: UserService,private loginservice:LoginService, private courseservice: CourseService) {}

  ngOnInit(): void {
    this.currentUser = this.loginservice.get_currentUser();
    this.loaduserCourses()
    };
    
    loaduserCourses(): void {
      const userId = this.currentUser.userId; 
    this.userservice.getCoursesTakenByUser(userId).subscribe(
      (courses) => {
        console.log(courses)
        this.coursesTakenByUser = courses;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    ); 
    }
    

  
  

    upgrade(): void {
      if (this.currentUser && this.currentUser.userId) {
        const updatedUserData = {
          subscription: 'Enterprise', 
        };
        this.userservice.updateData(this.currentUser.userId, updatedUserData).subscribe(
          (updatedUser) => {
            this.currentUser = updatedUser; 
            alert("Subscription Updated")
          },
          (error) => {
            console.error('Error upgrading user:', error);
          }
        );
      }
    }
}
