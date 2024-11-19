import { Component } from '@angular/core';
import { blog } from 'src/app/interfaces/blog';
import { OtherService } from 'src/app/services/other.service';
import { Course } from 'src/app/interfaces/courseInterface';
import { CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features:any[]=[]
  blog_data:blog[]=[]
  courses:Course[]=[]
  pricingBoxes:any[]=[]
  
  constructor(private otherservice:OtherService, private courseservice:CourseService){
    this.loadFeatures()
    this.loadBlog()
    this.loadPricing()
    this.loadCourses()
    }
    loadFeatures(): void {
      this.otherservice.getFeatures().subscribe(
        (data: any) => {
          this.features= data; 
        },
        (err) => {
          console.error(err);
        }
      );
    }

    loadBlog(){
      this.otherservice.getBlogs().subscribe(
        (data: any) => {
          this.blog_data= data; 
        },
        (err) => {
          console.error(err);
        }
      );
    }
  

    loadPricing(){
      this.otherservice.getPricing().subscribe(
        (data: any) => {
          this.pricingBoxes= data; 
          console.log(this.pricingBoxes)
        },
        (err) => {
          console.error(err);
        }
      );
    }
  

loadCourses(){
  this.courseservice.getCoursesFromDifferentCategory().subscribe(
    (data: any) => {
      this.courses= data; 
    },
    (err) => {
      console.error(err);
    }
  );
}


  
}

