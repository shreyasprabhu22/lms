import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit, OnDestroy {
  allcourses: any[] = [];
  student: any[] = [];
  instructorAll: any[] = [];
  instructorcount = 0;
  studentcount = 0;
  coursecount = 0;
  dashboard_state: string = 'user';
  subscriptionCounts = {
    Free: 0,
    BuyCourses: 0,
    Enterprise: 0
  };
  reviewCount = {
    lessThanTwo: 0,
    betweenTwoAndThree: 0,
    greaterThanThree: 0
  };
  courseCategoryCounts: any = {};  
  categoryLabels: string[] = [];   
  categoryData: number[] = [];  

  chart: any;
  barChart: any;
  reviewPieChart: any;

  constructor(
    private userservice: UserService,
    private courseservice: CourseService,
    private instructorservice: InstructorService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.courseservice.getData().subscribe((crs) => {
      this.allcourses = crs;
      this.coursecount = this.allcourses.length;
      this.calculateCourseCategoryCounts();
      this.createBarChart();
    });
  
    this.userservice.getData().subscribe((st) => {
      this.student = st;
      this.studentcount = this.student.length;
      this.countSubscriptions();
    });
  
    this.instructorservice.getData().subscribe((inst) => {
      this.instructorAll = inst;
      console.log(this.instructorAll)
      this.instructorcount = this.instructorAll.length;
      this.countReviews();  
      this.createChart();
      this.createPieChart();  
    });
  }
  
  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy();
    if (this.barChart) this.barChart.destroy();
    if (this.reviewPieChart) this.reviewPieChart.destroy(); 
  }

  countSubscriptions() {
    this.subscriptionCounts = {
      Free: 0,
      BuyCourses: 0,
      Enterprise: 0
    };

    this.student.forEach(user => {
      if (user.subscription === 'Free') {
        this.subscriptionCounts.Free++;
      } else if (user.subscription === 'Buy Courses') {
        this.subscriptionCounts.BuyCourses++;
      } else if (user.subscription === 'Enterprise') {
        this.subscriptionCounts.Enterprise++;
      }
    });
  }

  countReviews() {
    this.instructorAll.forEach(user => {
      if (user.reviewIns > 3) {
        this.reviewCount.greaterThanThree++;
      } else if (user.reviewCount == 2 || user.reviewCount == 3) {
        this.reviewCount.betweenTwoAndThree++;
      } else if (user.reviewCount < 2) {
        this.reviewCount.lessThanTwo++;
      }
    });
  }

  calculateCourseCategoryCounts() {
    this.courseCategoryCounts = {};
    this.allcourses.forEach(course => {
      const category = course.category; 
      if (this.courseCategoryCounts[category]) {
        this.courseCategoryCounts[category]++;
      } else {
        this.courseCategoryCounts[category] = 1;
      }
    });
    this.categoryLabels = Object.keys(this.courseCategoryCounts);
    this.categoryData = Object.values(this.courseCategoryCounts);
  }

  createChart() {
    if (this.chart) this.chart.destroy();

    this.chart = new Chart("dashboard1", {
      type: 'doughnut',
      data: {
        labels: ['Free', 'Buy Courses', 'Enterprise'],
        datasets: [{
          label: 'Subscription Types',
          data: [this.subscriptionCounts.Free, this.subscriptionCounts.BuyCourses, this.subscriptionCounts.Enterprise],
          backgroundColor: ['rgba(80, 161, 136)', 'rgba(129, 167, 140)', 'rgba(122, 148, 130'],
          hoverOffset: 4,
          hoverBackgroundColor:['rgb(80, 83, 81)','rgb(80, 83, 81)','rgb(80, 83, 81)']
        }],
      },
      options: {
        aspectRatio: 2.5,
        
      }
    });
  }

  createBarChart() {
    if (this.barChart) this.barChart.destroy(); 

    this.barChart = new Chart("dashboard3", {
      type: 'bar',
      data: {
        labels: this.categoryLabels,  
        datasets: [{
          label: 'Number of Courses by Category',
          data: this.categoryData,    
          backgroundColor: 'rgba(80, 161, 136)',
          borderColor: 'rgba(80, 161, 136)',
          hoverBackgroundColor:'rgb(80, 83, 81)',
          barThickness:100
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5
          }
          }
        },
        
      }
    });
  }

  createPieChart() {
    if (this.reviewPieChart) this.reviewPieChart.destroy(); 
  
    const reviewData = [
      this.reviewCount.lessThanTwo,
      this.reviewCount.betweenTwoAndThree,
      this.reviewCount.greaterThanThree
    ];
  
    const reviewLabels = ['< 2 Reviews', '2-3 Reviews', '> 3 Reviews'];
  
    this.reviewPieChart = new Chart("dashboard2", {
      type: 'pie',
      data : {
        labels:reviewLabels,
        datasets: [{
          label: 'Reviws',
          data: [300, 50, 100],
          backgroundColor: ['rgba(80, 161, 136)', 'rgba(129, 167, 140)', 'rgba(122, 148, 130'],
          hoverOffset: 4,
          hoverBackgroundColor:'rgb(80, 83, 81)'
        }]
      },
      
      options: {
        aspectRatio: 2.5
      }
    });
  }
  

  func1() {
    this.dashboard_state = "user";
    this.cdr.detectChanges();  
    this.createChart(); 
  }

  func2() {
    this.dashboard_state = "instructor";
    console.log(this.dashboard_state)
    this.cdr.detectChanges();  
    this.createPieChart(); 
  }

  func3() {
    this.dashboard_state = "course";
    this.cdr.detectChanges(); 
    this.createBarChart(); 
  }
}
