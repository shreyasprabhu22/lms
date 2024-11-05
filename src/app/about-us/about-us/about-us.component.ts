import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  categories =[
    {
      "iconClass": "fa-solid fa-laptop",
      "title": "Web Development",
      "description": "Learn the skills needed to build dynamic and responsive websites from scratch."
    },
    {
      "iconClass": "fa-solid fa-paint-brush",
      "title": "Graphic Design",
      "description": "Master design principles and tools to create stunning visuals and digital art."
    },
    {
      "iconClass": "fa-solid fa-chart-line",
      "title": "Data Science",
      "description": "Explore data analysis, machine learning, and statistics to make data-driven decisions."
    },
    {
      "iconClass": "fa-solid fa-bullhorn",
      "title": "Digital Marketing",
      "description": "Learn strategies and tools to market products effectively in the digital world."
    },
    {
      "iconClass": "fa-solid fa-brain",
      "title": "Artificial Intelligence",
      "description": "Dive into AI concepts, including machine learning, neural networks, and automation."
    },
    {
      "iconClass": "fa-solid fa-cogs",
      "title": "Engineering",
      "description": "Understand core engineering principles and apply them to solve real-world problems."
    },
    {
      "iconClass": "fa-solid fa-book-open",
      "title": "Humanities",
      "description": "Study the history, philosophy, and culture of human societies and civilizations."
    },
    {
      "iconClass": "fa-solid fa-code",
      "title": "Software Development",
      "description": "Gain proficiency in coding, software architecture, and programming languages."
    }
    
  ]

  getColorClass(index: number): string {
    const colorClasses = ['one', 'two', 'three']; 
    return colorClasses[index % colorClasses.length]; 
  }
  

}