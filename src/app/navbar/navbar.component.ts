import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  currentRoute: string = "";
  showFilterSection: boolean = false;

  scrollUp(event: any) {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  constructor(router: Router) {
    router.events.subscribe(() => {
      this.currentRoute = router.url;
    });
   }


  showHideFilterSection() {
    this.showFilterSection = !this.showFilterSection;
  }

}
