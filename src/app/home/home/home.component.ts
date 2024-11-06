import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features = [
    {
      "iconClass": "fa-solid fa-user",
      "title": "Personalized Learning Paths",
      "description": "Tailored learning experiences that adapt to individual needs and goals."
    },
    {
      "iconClass": "fa-solid fa-folder",
      "title": "Interactive Content",
      "description": "Engaging multimedia materials that make learning fun and effective."
    },
    {
      "iconClass": "fa-solid fa-list-check",
      "title": "Progress Tracking",
      "description": "Monitor your advancement with real-time insights into your learning journey."
    },
    {
      "iconClass": "fa-solid fa-users",
      "title": "Community Engagement",
      "description": "Connect with peers and mentors for collaboration and support."
    },
    {
      "iconClass": "fa-solid fa-mobile-screen",
      "title": "Mobile Accessibility",
      "description": "Learn anytime, anywhere with our fully responsive mobile platform."
    },
    {
      "iconClass": "fa-solid fa-file",
      "title": "Resource Sharing",
      "description": "Easily share and access a wealth of educational resources."
    }
  ];

  courses = [
    {
        "CourseID": "C001",
        "CourseName": "Introduction to Python",
        "Instructor": "Jane Doe",
        "Category": "Programming",
        "Duration": "10 weeks",
        "Price": 199.99,
        "Description": "Learn the basics of Python programming, including data types, functions, and control flow.",
        "Image": "assets/python.jpeg",
        "IImage":"assets/i1.jpeg",
        "Rating":5
    },
    {
        "CourseID": "C002",
        "CourseName": "Web Development Bootcamp",
        "Instructor": "John Smith",
        "Category": "Web Development",
        "Duration": "12 weeks",
        "Price": 299.99,
        "Description": "A comprehensive bootcamp covering HTML, CSS, JavaScript, and modern frameworks.",
        "Image": "assets/web_development_bootcamp.jpeg",
        "IImage":"assets/i2.jpeg",
        "Rating":5
    },
    {
        "CourseID": "C003",
        "CourseName": "Data Science Essentials",
        "Instructor": "Emily Johnson",
        "Category": "Data Science",
        "Duration": "8 weeks",
        "Price": 249.99,
        "Description": "Master the fundamental concepts of data science, including data analysis and machine learning.",
        "Image": "assets/data_science_essentials.jpeg",
        "IImage":"assets/i3.jpeg",
        "Rating":4
    },
    {
        "CourseID": "C004",
        "CourseName": "Digital Marketing ",
        "Instructor": "Michael Brown",
        "Category": "Marketing",
        "Duration": "6 weeks",
        "Price": 149.99,
        "Description": "Explore effective digital marketing strategies, including SEO, social media, and email marketing.",
        "Image": "assets/digital_marketing.jpeg",
        "IImage":"assets/i4.jpeg",
        "Rating":5
    }
  ]

  pricingBoxes = [
    {
        name: 'Free',
        price: '0',
        features: [
            'Free Courses Available',
            'Up to 1 user',
            'Basic Support',
            'Access to free courses'
        ]
    },
    {
        name: 'Buy Courses',
        price: 'Based on Course', 
        features: [
            'Pay per course',
            'Access to individual courses',
            'Standard Support',
            'No subscription required'
        ]
    },
    {
        name: 'Enterprise',
        price: '300',
        features: [
            'Unlimited users',
            '24/7 Premium Support',
            'Access to all courses',
            'Custom course creation'
        ]
    }
];



blog_data = [
  {
    "title": "Maximizing Your Study Time",
    "description": "Tips and tricks for efficient studying.",
    "date": "October 01, 2024",
    "category": "Education",
    "type": "blog",
    "image":"assets/blog.jpeg"
  },
  {
    "title": "Introduction to Data Science",
    "description": "Join our upcoming webinar on data science basics.",
    "date": "October 05, 2024",
    "category": "Data Science",
    "type": "webinar",
    "image":"assets/webinar.jpeg"
  },
  {
    "title": "Effective Online Learning Strategies",
    "description": "Explore strategies for online learning success.",
    "date": "September 20, 2024",
    "category": "Education",
    "type": "blog",
    "image":"assets/blog.jpeg"
  },
  {
    "title": "Advanced Python Programming",
    "description": "Deep dive into advanced Python techniques in our next webinar.",
    "date": "October 12, 2024",
    "category": "Programming",
    "type": "webinar",
    "image":"assets/webinar.jpeg"
  }
]


  
}
