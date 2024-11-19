import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instructor-container',
  templateUrl: './instructor-container.component.html',
  styleUrls: ['./instructor-container.component.css']
})
export class InstructorContainerComponent {
  @Input() instructor:any
}
