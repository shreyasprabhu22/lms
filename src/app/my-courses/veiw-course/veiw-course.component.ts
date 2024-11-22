import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/interfaces/courseInterface';
import { instructor } from 'src/app/interfaces/instructor';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-veiw-course',
  templateUrl: './veiw-course.component.html',
  styleUrls: ['./veiw-course.component.css']
})
export class VeiwCourseComponent {
  course_data! : Course
  course_id: string  |null=null
  instructor!:instructor
  isratingAvailable=false;
  ratingForm!:FormGroup;
  isratingGiven=false;
  reviews: { reviewerName: string; rating: number; comment: string }[] = [];


  constructor(private route:ActivatedRoute, 
     private courseservice:CourseService, 
     private instructorservice:InstructorService,
     private loginservice:LoginService
    ){
    this.course_id = this.route.snapshot.paramMap.get('id');
    this.load_course()

  }
ngOnInit(){
   this.ratingForm= new FormGroup({
    ratingLabel : new FormControl('',Validators.required),
    rating : new FormControl('',Validators.required),
    messageLabel : new FormControl('',Validators.required),
    message : new FormControl('',Validators.required)
   })
}

  load_course() {
    if (this.course_id) {
      this.courseservice.getOne(this.course_id).subscribe(
        (data: any) => {
          this.course_data = data;
          console.log(this.course_data);
          this.loadInstructor();
          this.checkRating()
          this.loadReviews()
        },
        (err) => {
          console.error(err);
        }
      );
      
    }
  }
  checkRating(){
    console.log(this.course_data.reviews)
    if(this.course_data.reviews && this.course_data.reviews.length>0){
         this.isratingAvailable=true
    }
        
        const found = this.course_data.reviews.some(review => review.reviewer === this.loginservice.get_currentUser().userId);
        if (found){
          this.isratingGiven=true
        }
  }

  loadReviews(){
      this.courseservice.getReviews(this.course_data.course_id).subscribe(
        (data:any)=>{
            this.reviews=data
        },
        (err)=>{
          console.log(err)
        }
      )
  }

  loadInstructor() {
    if (this.course_data && this.course_data.instructor_id) {
      console.log(this.course_data.instructor_id);
      this.instructorservice.getOne(this.course_data.instructor_id).subscribe(
        (data: any) => {
          this.instructor = data;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  submit(){
    let data={
      reviewer : this.loginservice.get_currentUser().userId,
      rating : this.ratingForm.value.rating,
      comment : this.ratingForm.value.message
    }

    this.courseservice.updateReviews(this.course_data.course_id,data).subscribe(
      (data)=>{
        alert("Your feedback submitted successfully")
        window.location.reload();

      },
      (err)=>{
        console.log(err)
      }
    )
  }
  }

