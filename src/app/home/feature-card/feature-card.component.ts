import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent {
  @Input() iconClass: string = '';  
  @Input() title: string = '';
  @Input() description: string = '';

}
