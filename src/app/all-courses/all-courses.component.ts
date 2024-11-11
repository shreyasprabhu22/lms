import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
})
export class AllCoursesComponent implements OnInit {
  selectedInstructor: string = '';
  selectedCategory: string = '';
  selectedRating: any = null;
  filteredCourses: any[] = [];
  courses: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    // Load courses from the CoursesService
    this.coursesService.loadCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = []; // Initialize with all courses
    });

  }

  // Get distinct list of instructors
  getInstructors() {
    return Array.from(new Set(this.courses.map((course) => course.Instructor)));
  }

  // Get distinct list of categories
  getCategories() {
    return Array.from(new Set(this.courses.map((course) => course.Category)));
  }

  // Filter courses based on selected criteria
  filterCourses() {
    const ratingNumber = this.selectedRating ? parseInt(this.selectedRating, 10) : null;
    this.filteredCourses = this.courses.filter(course => {
      const matchesInstructor = this.selectedInstructor ? course.Instructor === this.selectedInstructor : true;
      const matchesCategory = this.selectedCategory ? course.Category === this.selectedCategory : true;
      const matchesRating = ratingNumber !== null ? course.Rating === ratingNumber : true;
      return matchesInstructor && matchesCategory && matchesRating;
    });
  }

  // Get courses by selected category (filtered courses)
  getCoursesByCategory(category: string) {
    return this.filteredCourses.filter((course) => course.Category === category);
  }

  // Get all courses by selected category (from all courses)
  getAllCoursesByCategory(category: string) {
    return this.courses.filter((course) => course.Category === category);
  }

  // Clear all the selected filters
  clearFilters() {
    this.selectedInstructor = '';
    this.selectedCategory = '';
    this.selectedRating = null;
    this.filteredCourses = [...this.courses]; // Reset to all courses
  }
}
