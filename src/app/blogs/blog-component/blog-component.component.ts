import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-blog-component',
  templateUrl: './blog-component.component.html',
  styleUrls: ['./blog-component.component.css']
})
export class BlogComponentComponent {
 @Input() blog_data:any={}
}
