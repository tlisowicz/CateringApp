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


  constructor(router: Router) {
    router.events.subscribe(() => {
      this.currentRoute = router.url;
      
      if (this.currentRoute !== "/home") {
        this.showFilterSection = false;
      }
    });
   }


  showHideFilterSection() {
    
    this.showFilterSection = !this.showFilterSection;
  }

}
