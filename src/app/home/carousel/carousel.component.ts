import { Component } from '@angular/core';
import { OtherService } from 'src/app/services/other.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  carouselItems:any[]=[]
constructor(private otherservice:OtherService){
  this.loadCarousel()
}
loadCarousel(){
  this.otherservice.getCarouselItem().subscribe(
    (data: any) => {
      this.carouselItems= data; 
      console.log(this.carouselItems)
    },
    (err) => {
      console.error(err);
    }
  );
}
}
