import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.css']
})
export class PriceCardComponent {
  @Input() pricingBox: { name: string; price: string; features: string[] } = { name: '', price: '', features: [] };

}