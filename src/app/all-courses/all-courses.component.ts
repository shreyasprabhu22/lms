import { Component } from '@angular/core';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
})
export class AllCoursesComponent {
  selectedInstructor: string = '';
  selectedCategory: string = '';
  selectedRating: any = null;
  filteredCourses: any[] = [];

  constructor() {
    this.filteredCourses = [];
  }
  courses = [
    // Programming
    {
      CourseID: 'C001',
      CourseName: 'Introduction to Python',
      Instructor: 'Jane Doe',
      Category: 'Programming',
      Duration: '10 weeks',
      Price: 199.99,
      Description:
        'Learn the basics of Python programming, including data types, functions, and control flow.',
      Image: 'assets/course1.jpeg',
      IImage: 'assets/i1.jpeg',
      Rating: 5,
    },
    {
      CourseID: 'C002',
      CourseName: 'JavaScript for Beginners',
      Instructor: 'Emily White',
      Category: 'Programming',
      Duration: '8 weeks',
      Price: 179.99,
      Description:
        'A foundational course in JavaScript, covering syntax, DOM manipulation, and event handling.',
      Image: 'assets/course2.jpeg',
      IImage: 'assets/i2.jpeg',
      Rating: 4,
    },
    {
      CourseID: 'C003',
      CourseName: 'Advanced C++ Programming',
      Instructor: 'Mark Green',
      Category: 'Programming',
      Duration: '12 weeks',
      Price: 299.99,
      Description:
        'Dive deep into C++ with advanced topics including templates, STL, and multi-threading.',
      Image: 'assets/course3.jpeg',
      IImage: 'assets/i3.jpeg',
      Rating: 3,
    },
    {
      CourseID: 'C004',
      CourseName: 'Ruby on Rails Bootcamp',
      Instructor: 'Lisa Black',
      Category: 'Programming',
      Duration: '10 weeks',
      Price: 249.99,
      Description:
        'Build web applications using Ruby on Rails, covering MVC architecture and RESTful design.',
      Image: 'assets/course4.jpeg',
      IImage: 'assets/i4.jpeg',
      Rating: 5,
    },

    // Web Development
    {
      CourseID: 'C005',
      CourseName: 'Web Development Bootcamp',
      Instructor: 'John Smith',
      Category: 'Web Development',
      Duration: '12 weeks',
      Price: 299.99,
      Description:
        'A comprehensive bootcamp covering HTML, CSS, JavaScript, and modern frameworks.',
      Image: 'assets/course1.jpeg',
      IImage: 'assets/i1.jpeg',
      Rating: 5,
    },
    {
      CourseID: 'C006',
      CourseName: 'Responsive Web Design',
      Instructor: 'Sara Lee',
      Category: 'Web Development',
      Duration: '6 weeks',
      Price: 149.99,
      Description:
        'Learn how to create responsive websites using CSS Flexbox and Grid.',
      Image: 'assets/course2.jpeg',
      IImage: 'assets/i2.jpeg',
      Rating: 4,
    },
    {
      CourseID: 'C007',
      CourseName: 'Frontend Frameworks Overview',
      Instructor: 'Tom Johnson',
      Category: 'Web Development',
      Duration: '8 weeks',
      Price: 199.99,
      Description:
        'An introduction to popular frontend frameworks like React, Vue, and Angular.',
      Image: 'assets/course3.jpeg',
      IImage: 'assets/i3.jpeg',
      Rating: 3,
    },

    // Data Science
    {
      CourseID: 'C008',
      CourseName: 'Data Science Essentials',
      Instructor: 'Emily Johnson',
      Category: 'Data Science',
      Duration: '8 weeks',
      Price: 249.99,
      Description:
        'Master the fundamental concepts of data science, including data analysis and machine learning.',
      Image: 'assets/course4.jpeg',
      IImage: 'assets/i4.jpeg',
      Rating: 4,
    },
    {
      CourseID: 'C009',
      CourseName: 'Machine Learning A-Z',
      Instructor: 'Alex Kim',
      Category: 'Data Science',
      Duration: '10 weeks',
      Price: 299.99,
      Description:
        'Comprehensive course on machine learning algorithms, techniques, and real-world applications.',
      Image: 'assets/course1.jpeg',
      IImage: 'assets/i1.jpeg',
      Rating: 5,
    },
    {
      CourseID: 'C010',
      CourseName: 'Data Visualization with Python',
      Instructor: 'Nina Brown',
      Category: 'Data Science',
      Duration: '6 weeks',
      Price: 199.99,
      Description:
        'Learn how to visualize data effectively using libraries like Matplotlib and Seaborn.',
      Image: 'assets/course2.jpeg',
      IImage: 'assets/i2.jpeg',
      Rating: 3,
    },
    {
      CourseID: 'C011',
      CourseName: 'Statistics for Data Science',
      Instructor: 'Richard Moore',
      Category: 'Data Science',
      Duration: '8 weeks',
      Price: 179.99,
      Description:
        'Understand statistical concepts that are crucial for data science.',
      Image: 'assets/course3.jpeg',
      IImage: 'assets/i3.jpeg',
      Rating: 2,
    },

    // Marketing
    {
      CourseID: 'C012',
      CourseName: 'Digital Marketing',
      Instructor: 'Michael Brown',
      Category: 'Marketing',
      Duration: '6 weeks',
      Price: 149.99,
      Description:
        'Explore effective digital marketing strategies, including SEO, social media, and email marketing.',
      Image: 'assets/course4.jpeg',
      IImage: 'assets/i4.jpeg',
      Rating: 5,
    },
    {
      CourseID: 'C013',
      CourseName: 'Social Media Marketing',
      Instructor: 'Jessica Taylor',
      Category: 'Marketing',
      Duration: '4 weeks',
      Price: 99.99,
      Description:
        'Learn how to build and execute a social media strategy that drives engagement.',
      Image: 'assets/course1.jpeg',
      IImage: 'assets/i1.jpeg',
      Rating: 4,
    },
    {
      CourseID: 'C014',
      CourseName: 'Content Marketing Strategy',
      Instructor: 'Laura Wilson',
      Category: 'Marketing',
      Duration: '5 weeks',
      Price: 129.99,
      Description:
        'Develop a comprehensive content marketing strategy to attract and retain customers.',
      Image: 'assets/course2.jpeg',
      IImage: 'assets/i2.jpeg',
      Rating: 4,
    },

    // Graphic Design
    {
      CourseID: 'C015',
      CourseName: 'Graphic Design Fundamentals',
      Instructor: 'Andrew Davis',
      Category: 'Graphic Design',
      Duration: '8 weeks',
      Price: 199.99,
      Description:
        'An introduction to graphic design principles and software like Adobe Illustrator.',
      Image: 'assets/course3.jpeg',
      IImage: 'assets/i3.jpeg',
      Rating: 5,
    },
    {
      CourseID: 'C016',
      CourseName: 'Digital Illustration Techniques',
      Instructor: 'Sarah Wilson',
      Category: 'Graphic Design',
      Duration: '6 weeks',
      Price: 159.99,
      Description:
        'Learn digital illustration techniques using Procreate and Adobe Fresco.',
      Image: 'assets/course4.jpeg',
      IImage: 'assets/i4.jpeg',
      Rating: 4,
    },
    {
      CourseID: 'C017',
      CourseName: 'Branding and Identity Design',
      Instructor: 'Chris Evans',
      Category: 'Graphic Design',
      Duration: '7 weeks',
      Price: 179.99,
      Description:
        'Understand branding principles and create a brand identity for a fictional company.',
      Image: 'assets/course1.jpeg',
      IImage: 'assets/i1.jpeg',
      Rating: 4,
    },

    // Business
    {
      CourseID: 'C018',
      CourseName: 'Entrepreneurship 101',
      Instructor: 'David Clark',
      Category: 'Business',
      Duration: '10 weeks',
      Price: 249.99,
      Description:
        'Explore the fundamentals of entrepreneurship, including idea validation and business planning.',
      Image: 'assets/course2.jpeg',
      IImage: 'assets/i2.jpeg',
      Rating: 5,
    },
    {
      CourseID: 'C019',
      CourseName: 'Project Management Principles',
      Instructor: 'Julia Roberts',
      Category: 'Business',
      Duration: '8 weeks',
      Price: 199.99,
      Description:
        'Learn the essential principles and practices of effective project management.',
      Image: 'assets/course3.jpeg',
      IImage: 'assets/i3.jpeg',
      Rating: 3,
    },
    {
      CourseID: 'C020',
      CourseName: 'Financial Literacy for Beginners',
      Instructor: 'Kevin Scott',
      Category: 'Business',
      Duration: '6 weeks',
      Price: 149.99,
      Description:
        'Understand personal finance basics, including budgeting and investing.',
      Image: 'assets/course4.jpeg',
      IImage: 'assets/i4.jpeg',
      Rating: 2,
    },
    {
      CourseID: 'C021',
      CourseName: 'Marketing Management',
      Instructor: 'Patricia Green',
      Category: 'Business',
      Duration: '8 weeks',
      Price: 199.99,
      Description:
        'Study the principles of marketing management and strategic marketing planning.',
      Image: 'assets/course1.jpeg',
      IImage: 'assets/i1.jpeg',
      Rating: 4,
    },

    // Personal Development
    {
      CourseID: 'C022',
      CourseName: 'Time Management Skills',
      Instructor: 'Anthony White',
      Category: 'Personal Development',
      Duration: '4 weeks',
      Price: 89.99,
      Description:
        'Learn techniques to manage your time more effectively and boost productivity.',
      Image: 'assets/course2.jpeg',
      IImage: 'assets/i2.jpeg',
      Rating: 5,
    },
    {
      CourseID: 'C023',
      CourseName: 'Effective Communication',
      Instructor: 'Sandra Brown',
      Category: 'Personal Development',
      Duration: '6 weeks',
      Price: 99.99,
      Description:
        'Enhance your communication skills for personal and professional growth.',
      Image: 'assets/course3.jpeg',
      IImage: 'assets/i3.jpeg',
      Rating: 4,
    },
    {
      CourseID: 'C024',
      CourseName: 'Leadership Development',
      Instructor: 'Charles Harris',
      Category: 'Personal Development',
      Duration: '8 weeks',
      Price: 149.99,
      Description:
        'Learn the principles of effective leadership and how to lead teams successfully.',
      Image: 'assets/course4.jpeg',
      IImage: 'assets/i4.jpeg',
      Rating: 4,
    },
    {
      CourseID: 'C025',
      CourseName: 'Mindfulness and Stress Management',
      Instructor: 'Linda Turner',
      Category: 'Personal Development',
      Duration: '5 weeks',
      Price: 99.99,
      Description:
        'Practice mindfulness techniques to manage stress and improve well-being.',
      Image: 'assets/course1.jpeg',
      IImage: 'assets/i1.jpeg',
      Rating: 5,
    },

    // Health & Fitness
    {
      CourseID: 'C026',
      CourseName: 'Yoga for Beginners',
      Instructor: 'Emily Roberts',
      Category: 'Health & Fitness',
      Duration: '6 weeks',
      Price: 120.0,
      Description:
        'An introduction to yoga, covering basic postures and breathing techniques.',
      Image: 'assets/course2.jpeg',
      IImage: 'assets/i2.jpeg',
      Rating: 4,
    },
    {
      CourseID: 'C027',
      CourseName: 'Nutrition Basics',
      Instructor: 'John Walker',
      Category: 'Health & Fitness',
      Duration: '5 weeks',
      Price: 90.0,
      Description:
        'Learn the fundamentals of nutrition and how to create a balanced diet.',
      Image: 'assets/course3.jpeg',
      IImage: 'assets/i3.jpeg',
      Rating: 5,
    },
    {
      CourseID: 'C028',
      CourseName: 'Fitness Training Techniques',
      Instructor: 'Sara Johnson',
      Category: 'Health & Fitness',
      Duration: '8 weeks',
      Price: 180.0,
      Description:
        'Explore various fitness training techniques to enhance physical performance.',
      Image: 'assets/course4.jpeg',
      IImage: 'assets/i4.jpeg',
      Rating: 3,
    },
    {
      CourseID: 'C029',
      CourseName: 'Mental Health Awareness',
      Instructor: 'Mark Taylor',
      Category: 'Health & Fitness',
      Duration: '4 weeks',
      Price: 75.0,
      Description:
        'Understand the importance of mental health and ways to support it.',
      Image: 'assets/course1.jpeg',
      IImage: 'assets/i1.jpeg',
      Rating: 4,
    },
  ];

  getInstructors() {
    return Array.from(new Set(this.courses.map((course) => course.Instructor)));
  }

  getCategories() {
    return Array.from(new Set(this.courses.map((course) => course.Category)));
  }
  filterCourses() {
    console.log('Filtering Courses:', { 
      selectedInstructor: this.selectedInstructor, 
      selectedCategory: this.selectedCategory, 
      selectedRating: this.selectedRating 
  });
  const ratingNumber = this.selectedRating ? parseInt(this.selectedRating, 10) : null;
  this.filteredCourses = this.courses.filter(course => {
    const matchesInstructor = this.selectedInstructor ? course.Instructor === this.selectedInstructor : true;
    const matchesCategory = this.selectedCategory ? course.Category === this.selectedCategory : true;
    const matchesRating = ratingNumber !== null ? course.Rating === ratingNumber : true;

    return matchesInstructor && matchesCategory && matchesRating;
});
  }

  getCoursesByCategory(category: string) {
    return this.filteredCourses.filter(
      (course) => course.Category === category
    );
  }

  getAllCoursesByCategory(category: string) {
    return this.courses.filter((course) => course.Category === category);
  }
  clearFilters() {
    this.selectedInstructor = '';
    this.selectedCategory = '';
    this.selectedRating = null;
    this.filteredCourses = [];
  }
}
