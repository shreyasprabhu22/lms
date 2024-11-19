import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/interfaces/courseInterface';
import { instructor } from 'src/app/interfaces/instructor';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
@Component({
  selector: 'app-veiw-course',
  templateUrl: './veiw-course.component.html',
  styleUrls: ['./veiw-course.component.css']
})
export class VeiwCourseComponent {
  course_data! : Course
  course_id: string  |null=null
  instructor!:instructor


  constructor(private route:ActivatedRoute,  private courseservice:CourseService, private instructorservice:InstructorService){
    this.course_id = this.route.snapshot.paramMap.get('id');
    this.load_course()
  }
  load_course() {
    if (this.course_id) {
      this.courseservice.getOne(this.course_id).subscribe(
        (data: any) => {
          this.course_data = data;
          console.log(this.course_data);
          this.loadInstructor();
        },
        (err) => {
          console.error(err);
        }
      );
    }
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
  }

