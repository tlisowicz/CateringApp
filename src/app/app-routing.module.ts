import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './add-dish/add-dish.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { WelcomePageComponent } from './welcome-page/wecome-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: "home", component: MainPageComponent},
  {path: "cart", component: CartDetailsComponent},
  { path: "add", component: AddDishComponent},
  { path: "dish-details/:id", component: DishDetailsComponent},
  {path: ":user/order-history", component: OrderHistoryComponent, data: {userId: 0} },
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
