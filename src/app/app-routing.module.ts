import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './add-dish/add-dish.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { CartDetailsComponent } from './views/cart-details/cart-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { WelcomePageComponent } from './views/welcome-page/wecome-page.component';
import { SignOrLogInComponent } from './views/sign-or-log-in/sign-or-log-in.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { DishManagementComponent } from './views/dish-management/dish-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: "menu", component: MainPageComponent},
  {path: "cart", component: CartDetailsComponent, canActivate: [AuthGuard]},
  { path: "add", component: AddDishComponent, canActivate: [AuthGuard]},
  { path: "dish-details/:id", component: DishDetailsComponent, canActivate: [AuthGuard]},
  {path: ":user/order-history", component: OrderHistoryComponent, canActivate: [AuthGuard] },
  {path: "adminView", component: AdminViewComponent, canActivate: [AuthGuard]},
  {path: "dishManagement", component: DishManagementComponent, canActivate: [AuthGuard]},
  {path: "logIn", component: SignOrLogInComponent, canActivate: [AuthGuard]},
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
