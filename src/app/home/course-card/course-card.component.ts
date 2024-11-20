import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { Course } from 'src/app/interfaces/courseInterface';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
  @Input() course: any;
  @Input() instructor_id:any;
  isAllCoursesPage: boolean = false;
  isEnterpriseUser: boolean = false;
  isMyCoursesPage:boolean =false;
  instructor:any={}

  constructor(private loginservice:LoginService,
     private cartservice:CartService ,
     private userservice:UserService, 
     private instructorservice:InstructorService,
     private router: Router) {}

  ngOnInit() {
    this.checkIfAllCoursesPage();
    this.checkIfMyCoursesPage()
    this.checkSubscriptionStatus();
    this.setInstructor()
  }

  setInstructor() {
    console.log(this.instructor_id);
    this.instructorservice.getOne(this.instructor_id).subscribe(
      (instructor) => {
        this.instructor = instructor;
        console.log(this.instructor);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  

  checkIfAllCoursesPage(): void {
    const currentRoute = this.router.url;
    this.isAllCoursesPage = currentRoute.includes('/courses');
  }
  checkIfMyCoursesPage(): void {
    const currentRoute = this.router.url;
    this.isMyCoursesPage = currentRoute.includes('/mycourses');
  }

  checkSubscriptionStatus() {
    const currentUser = this.loginservice.get_currentUser();
    if (currentUser && currentUser.subscription === 'Enterprise') {
      this.isEnterpriseUser = true;
    }
  }

  onStartCourse(course: any) {
    const currentUser = this.loginservice.get_currentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  

    const coursesPurchased = Array.isArray(currentUser.coursesPurchased) ? currentUser.coursesPurchased : [];
  
    if (course.price === 'Free' || course.price === 0) {
      this.userservice.updateCourse(currentUser.userId, { 
        coursesPurchased: [...coursesPurchased, course.course_id] 
      }).subscribe(updatedUser => {
        alert('You have successfully enrolled in the free course!');
      }, error => {
        console.error('Error updating purchased courses:', error);
        alert('Failed to enroll in the free course.');
      });
  
    } else {
      this.cartservice.addCourseToCart(currentUser.userId, course.course_id).subscribe(() => {
        alert('Course has been added to your cart.');
      }, error => {
        console.error('Error adding course to cart:', error);
        if(error===''){

        }
        alert('Failed to add course to cart.');
      });
    }
  }
  

  get_rating(course:any): number {
    if (!course.reviews || course.reviews.length === 0) {
      return 0; 
    }

    const totalRatings = course.reviews.reduce((sum:any, review:any) => sum + review.rating, 0);
    return totalRatings / course.reviews.length;
  }

  onviewCourse(course:Course){
      this.router.navigate(['/view-course',course.course_id])
  }
}
