import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollUpComponent {

  showMe: boolean = false;

  @HostListener('window:scroll', ['$event']) 
  onScroll($event: Event): void {
   if (window.scrollY > 300) {
    this.showMe = true;
   }
   else {
    this.showMe = false;
   }
  }

  scrollUp(event: any) {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
