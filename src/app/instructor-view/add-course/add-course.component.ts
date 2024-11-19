import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { LoginService } from 'src/app/services/login.service';
import { Course } from 'src/app/interfaces/courseInterface';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseFormGroup!: FormGroup;
  detailsFormGroup!: FormGroup;
  msg = '';
  isEditMode: boolean = false;
  courseId: string = '';

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private courseservice: CourseService,
              private loginservice: LoginService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.detailsFormGroup = this._formBuilder.group({
      courseContent: this._formBuilder.array([this.createWeek(), this.createWeek()]),
      prerequisite: ['', Validators.required],
      level: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
      console.log(this.courseId)
      if (this.courseId) {
        this.isEditMode = true;
        this.loadCourseData();
      }
    });
  }

  loadCourseData(): void {
    if (this.courseId) {
      this.courseservice.getOne(this.courseId).subscribe(course => {
        console.log(course)
        this.courseFormGroup.patchValue({
          name: course.name,
          category: course.category,
          duration: course.duration,
          description: course.description
        });

        this.detailsFormGroup.patchValue({
          prerequisite: course.prerequisites[0],
          level: course.level,
          price: course.price
        });

        const courseContentArray = (this.detailsFormGroup.get('courseContent') as FormArray);
        courseContentArray.clear();
        course.courseContent.forEach(content => {
          courseContentArray.push(this._formBuilder.group({
            week: content.week,
            title: content.title,
            description: content.description
          }));
        });
      });
    }
  }

  get weekControls() {
    return (this.detailsFormGroup.get('courseContent') as FormArray).controls;
  }

  createWeek(): FormGroup {
    return this._formBuilder.group({
      week: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  addWeek(): void {
    (this.detailsFormGroup.get('courseContent') as FormArray).push(this.createWeek());
  }

  submitForm() {
    if (this.courseFormGroup.valid && this.detailsFormGroup.valid) {
      const courseContent = this.detailsFormGroup.value.courseContent;

      const newCourse: Course = {
        course_id: this.courseId || '',
        name: this.courseFormGroup.value.name,
        category: this.courseFormGroup.value.category,
        duration: this.courseFormGroup.value.duration,
        description: this.courseFormGroup.value.description,
        instructor_id: this.loginservice.get_currentUser().instructorId,
        img: 'assets/courses.jpeg',
        courseContent: courseContent,
        prerequisites: [this.detailsFormGroup.value.prerequisite],
        reviews: [{ reviewer: '', rating: 0, comment: '' }],
        level: this.detailsFormGroup.value.level,
        price: this.detailsFormGroup.value.price,
        faq: [{ question: '', answer: '' }]
      };

      if (this.isEditMode) {
        this.courseservice.updateCourse(this.courseId, newCourse).subscribe({
          next: () => {
            alert('Course updated successfully!');
            this.router.navigate(['/instructor-dashboard']);
          },
          error: (err) => {
            this.msg = 'There was an error updating the course. Please try again later.';
            console.error('Error updating course:', err);
          }
        });
      } else {
        this.courseservice.postData(newCourse).subscribe({
          next: () => {
            alert('Course created successfully!');
            this.router.navigate(['/instructor-dashboard']);
          },
          error: (err) => {
            this.msg = 'There was an error creating the course. Please try again later.';
            console.error('Error creating course:', err);
          }
        });
      }
    } else {
      this.msg = 'Please fill out all fields correctly.';
    }
  }
}
