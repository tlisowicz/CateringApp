import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './add-dish/add-dish.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: MainPageComponent},
  {path: "cart", component: CartDetailsComponent},
  { path: "add", component: AddDishComponent},
  { path: "dish-details/:id", component: DishDetailsComponent},
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
