import { Component } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(router: Router, private currencyService: CurrencyService) {
    router.events.subscribe(() => {
      this.currentRoute = router.url;
      
      if (this.currentRoute !== "/home") {
        this.showFilterSection = false;
      }
    });

    currencyService.currency.subscribe(currency => {
      this.chosenCurrency = currency;
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
}
