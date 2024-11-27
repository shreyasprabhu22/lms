import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  totalCost: number = 0;


  constructor(
    private userservice: UserService, 
    private router: Router,
    private courseService: CourseService,
    private cartservice: CartService,
    private loginservice: LoginService
  ) {

  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartservice.getData(this.loginservice.get_currentUser().userId).subscribe(
      (cartWithCourses) => {
        this.cart = cartWithCourses;
        this.calculateTotalCost();
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  calculateTotalCost() {
    this.totalCost = this.cart.reduce((total, course) => {
      return total + (typeof course.courseDetails?.price === 'number' ? course.courseDetails?.price : 0);
    }, 0);
  }

  removeCourse(courseId: string) {
    this.cartservice.removeCourseFromCart(this.loginservice.get_currentUser().userId, courseId).subscribe(
      (response) => {
        this.loadCart();
      },
      (error) => {
        console.error('Error removing course from cart:', error);
      }
    );
  }

  buyCourses() {
    const currentUser = this.loginservice.get_currentUser();
  
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  
    const coursesPurchased = Array.isArray(currentUser.coursesPurchased) ? currentUser.coursesPurchased : [];
    const courseIdsToAdd = this.cart.map(course => course.courseDetails?.course_id);
  
    this.courseService.getData().subscribe(courses => {
      const coursesToAdd = courses.filter(course => courseIdsToAdd.includes(course.course_id));
  
      if (coursesToAdd.length === 0) {
        alert('No valid courses found for purchase.');
        return;
      }
  
      this.userservice.updateCourse(currentUser.userId, {
        coursesPurchased: [...coursesPurchased, ...coursesToAdd.map(course => course.course_id)],
        subscription: 'Buy Courses'
      }).subscribe(updatedUser => {
        this.cartservice.clearCart(currentUser.userId).subscribe(
          () => {
            this.cart = [];
            this.totalCost = 0;
            alert('Purchase successful');
            this.router.navigate(['/mycourses']);
          },
          (error: HttpErrorResponse) => {
            console.error('Error clearing cart:', error);
            alert('Failed to clear the cart after purchase.');
          }
        );
      }, error => {
        console.error('Error updating user data:', error);
        alert('Failed to update user data after purchase.');
      });
    }, error => {
      console.error('Error fetching courses:', error);
      alert('Failed to fetch courses for purchase.');
    });
  }
  
  
}
