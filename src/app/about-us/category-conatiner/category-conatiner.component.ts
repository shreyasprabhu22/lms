import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-conatiner',
  templateUrl: './category-conatiner.component.html',
  styleUrls: ['./category-conatiner.component.css']
})
export class CategoryConatinerComponent {
  @Input() iconClass: string = '';  
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() colorClass: string=""; 
}
