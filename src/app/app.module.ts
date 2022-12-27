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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DolEurExchangerPipe } from './dol-eur-exchanger.pipe';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './dish-details/carousel/carousel.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentComponent } from './comment/comment.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { AddCommentFormComponent } from './add-comment-form/add-comment-form.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselComponent,   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
