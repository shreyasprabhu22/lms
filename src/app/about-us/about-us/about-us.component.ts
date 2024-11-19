import { Component } from '@angular/core';
import { OtherService } from 'src/app/services/other.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  categories:any[] =[]
  
  constructor(private otherservice:OtherService){
  this.loadInstructors()
  }
  loadInstructors(): void {
    this.otherservice.getData().subscribe(
      (data: any) => {
        this.categories = data; 
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getColorClass(index: number): string {
    const colorClasses = ['one', 'two', 'three']; 
    return colorClasses[index % colorClasses.length]; 
  }
  

}