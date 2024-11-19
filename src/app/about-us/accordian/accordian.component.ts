import { Component } from '@angular/core';
import { OtherService } from 'src/app/services/other.service';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.css']
})
export class AccordianComponent {
  faq:any[]=[]
  constructor(private otherservice:OtherService){
    this.loadFaqs()
    }
    loadFaqs(): void {
      this.otherservice.getFaq().subscribe(
        (data: any) => {
          this.faq = data; 
          console.log(data)
        },
        (err) => {
          console.error(err);
        }
      );
}

}
