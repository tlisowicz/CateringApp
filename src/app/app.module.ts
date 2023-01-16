import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishCardComponent } from './dish-card/dish-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { DolEurExchangerPipe } from './pipes/dol-eur-exchanger.pipe';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './dish-details/carousel/carousel.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentComponent } from './comment/comment.component';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { AddCommentFormComponent } from './add-comment-form/add-comment-form.component';
import { SearchPipe } from './pipes/search.pipe';
import { PricePipe } from './pipes/price.pipe';
import { DishTypePipe } from './pipes/dish-type.pipe';
import { KitchenTypePipe } from './pipes/kitchen-type.pipe';
import { DishCategoryPipe } from './pipes/dish-category.pipe';
import { RatingPipe } from './pipes/rating.pipe';
import { ScrollUpComponent } from './shared/scroll-up/scroll-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './cart/cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartDetailsComponent } from './views/cart-details/cart-details.component';
import { ModalWindowComponent } from './shared/modal-window/modal-window.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { WelcomePageComponent } from './views/welcome-page/wecome-page.component';
import { SignOrLogInComponent } from './views/sign-or-log-in/sign-or-log-in.component';
import { LoginBoxComponent } from './login-box/login-box.component';
import { SignUpBoxComponent } from './sign-up-box/sign-up-box.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { DishManagementComponent } from './views/dish-management/dish-management.component';

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    DishCardComponent,
    NavbarComponent,
    FilterSectionComponent,
    AddDishComponent,
    PageNotFoundComponent,
    MainPageComponent,
    DolEurExchangerPipe,
    DishDetailsComponent,
    CommentSectionComponent,
    CommentComponent,
    StarRatingComponent,
    AddCommentFormComponent,
    SearchPipe,
    PricePipe,
    DishTypePipe,
    KitchenTypePipe,
    DishCategoryPipe,
    RatingPipe,
    ScrollUpComponent,
    CartComponent,
    CartDetailsComponent,
    ModalWindowComponent,
    OrderHistoryComponent,
    WelcomePageComponent,
    SignOrLogInComponent,
    LoginBoxComponent,
    SignUpBoxComponent,
    AdminViewComponent,
    DishManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselComponent,   
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
