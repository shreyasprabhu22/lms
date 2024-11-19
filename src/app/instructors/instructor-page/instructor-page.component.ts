import { Component } from '@angular/core';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.css']
})
export class InstructorPageComponent {

  instructors = []; 
  error: string = ''; 
  constructor(private instructorservice: InstructorService) { }

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors(): void {
    this.instructorservice.getData().subscribe(
      (data: any) => {
        this.instructors = data; 
      },
      (err) => {
        this.error = 'Failed to load instructors'; 
        console.error(err);
      }
    );
  }
}
