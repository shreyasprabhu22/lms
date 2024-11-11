import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
  @Input() course: any;
  isAllCoursesPage: boolean = false;
  isEnterpriseUser: boolean = false;

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.checkIfAllCoursesPage();
    this.checkSubscriptionStatus();
  }

  checkSubscriptionStatus() {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser && currentUser.subscription === 'Enterprise') {
      this.isEnterpriseUser = true;
    }
  }

  onStartCourse(course: any) {
    const currentUser = this.userService.getCurrentUser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    if (course.Price === 'Free' || course.Price === 0) {
      this.userService.updateUserCourses([course]).subscribe(updatedUser => {
        alert(`You have successfully enrolled in the course: ${course.CourseName}`);
      }, error => {
        console.error('Error updating user courses:', error);
        alert('Failed to enroll in the course.');
      });
    } else {
      this.userService.addCourseToCart(course);
      alert('Added course to cart');
    }
  }

  checkIfAllCoursesPage(): void {
    const currentRoute = this.router.url;
    this.isAllCoursesPage = currentRoute.includes('/courses');
  }
}
