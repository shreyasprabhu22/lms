import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  @Input() targetValue: number = 0; 
  @Input() counterName: string = '';
  @Input() iconClass: string = ''; 

  counterValue: number = 0; 
  private observer: IntersectionObserver | null = null; 

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initObserver();
  }

  initObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounter();
          
          this.observer?.unobserve(this.el.nativeElement);
        }
      });
    });

   
    this.observer.observe(this.el.nativeElement);
  }

  startCounter(): void {
    const duration = 1500; 
    this.animateValue(this.targetValue, duration);
  }

  animateValue(target: number, duration: number): void {
    let start = 0;
    const increment = target / (duration / 100);
    const timer = setInterval(() => {
      start += increment;
      this.counterValue = Math.floor(start); 
      if (start >= target) {
        clearInterval(timer);
        this.counterValue = target; 
      }
    }, 100);
  }
}
