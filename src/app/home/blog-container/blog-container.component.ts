import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-container',
  templateUrl: './blog-container.component.html',
  styleUrls: ['./blog-container.component.css']
})
export class BlogContainerComponent {
  @Input() blogdata:any={}
}
