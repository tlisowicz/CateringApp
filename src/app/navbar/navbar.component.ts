import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  currentRoute: string = "";
  showFilterSection: boolean = false;
  chosenCurrency: string = "";
  isUserLoggedIn: boolean = false;
  userName: string = "";
  userRoles: string[] = [];

  constructor(
    private router: Router, 
    private currencyService: CurrencyService,
    private auth : AuthService) 
    {
    router.events.subscribe(() => {
      this.currentRoute = router.url;
      
      if (this.currentRoute !== "/menu") {
        this.showFilterSection = false;
      }
    });
    currencyService.currency.subscribe(currency => {
      this.chosenCurrency = currency;
    });
    this.auth.userState.subscribe(userState => {
      if (userState) {
        this.isUserLoggedIn = true;
        this.userName = userState.username;
        this.userRoles = userState.roles;
      }
      else {
        this.userName = "";
        this.isUserLoggedIn = false;
        this.userRoles = [];
      }
    })
   }


  showHideFilterSection() {
    this.showFilterSection = !this.showFilterSection;
  }

  setCurrency(e: any) {
    const currency = e.target.innerHTML;
    if (currency === "$") {
      e.target.innerHTML = "€";
      this.currencyService.setCurrency("USD");
      
    }
    else {
      e.target.innerHTML = "$";
      this.currencyService.setCurrency("EUR");
    }
  }

  logOut() {
    this.auth.logOutUser();
    this.router.navigate(['/menu']);
  }
}
