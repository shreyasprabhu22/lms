import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  totalCost: number = 0;

  constructor(
    private userService: UsersService, 
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.cart = this.userService.getCart();
      this.calculateTotalCost();
    } else {
      this.router.navigate(['/login']);
    }
  }

  calculateTotalCost() {
    this.totalCost = this.cart.reduce((total, course) => {
      return total + (typeof course.Price === 'number' ? course.Price : 0);
    }, 0);
  }

  removeCourse(courseId: string) {
    this.userService.removeCourseFromCart(courseId);
    this.loadCart();
  }

  buyCourses() {
    const currentUser = this.userService.getCurrentUser();
    
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  
    const courseIdsToAdd = this.cart.map(course => course.CourseID);
  
    this.coursesService.getCoursesByIds(courseIdsToAdd).subscribe(courses => {
      if (currentUser) {
        this.userService.updateUserCourses(courses).subscribe(updatedUser => {
          this.userService.updateUserSubscription('Buy Courses').subscribe(updatedUserWithSubscription => {
            alert(`You have successfully purchased courses `);
          }, error => {
            console.error('Error updating user subscription:', error);
            alert('Failed to update your subscription.');
          });
        }, error => {
          console.error('Error updating user courses:', error);
          alert('Failed to update your courses.');
        });
      }
  
      this.userService.clearCart();
      this.loadCart();
    });
  }
  
}
