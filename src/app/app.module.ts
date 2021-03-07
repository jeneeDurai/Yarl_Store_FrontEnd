import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { DealsOfTheDayComponent } from './deals-of-the-day/deals-of-the-day.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ProductListBannerComponent } from './product-list-banner/product-list-banner.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './account/register/register.component';
import { AccountComponent } from './account/account.component';
import { SigninComponent } from './account/signin/signin.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { CategoryProductListComponent } from './category-product-list/category-product-list.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { CartService } from './services/cart.service';
import { CountryService } from './services/country.service';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WhisListService } from './services/whislist.service';
import { HomeService } from './services/home.service';
// import { RatingModule } from 'ng-starrating';
// import { StarRatingModule } from '@sreyaj/ng-star-rating';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxSlideshowAcracodeModule } from 'ngx-slideshow-acracode';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OtherService } from './services/other.service';

/* resolver */

import { ProductResolver } from './resolver/product.reslover';
import { HomeResolver } from './resolver/home.resolver';
import { ProductDetaiResolver } from './resolver/product-detail.resolver';
import { CategoryDetailResolver } from './resolver/category-detail.resolver';
import { CheckoutComponent } from './checkout/checkout.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {CurrencyService} from './services/currency.service';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { ProfileComponent } from './profile/profile.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import {MostSellingProductsResolver} from './resolver/most-selling-products.resolver';
import { UserProfileResolver } from './resolver/userProfile.resolver';
import  { StarComponent } from './shared/star.component';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    DealsOfTheDayComponent,
    ProductListBannerComponent,
    FooterComponent,
    ProductDetailsComponent,
    HomeComponent,
    RegisterComponent,
    AccountComponent,
    SigninComponent,
    CartComponent,
    CategoryProductsComponent,
    CategoryProductListComponent,
    ProductFiltersComponent,
    CategoryFilterComponent,
    CheckoutComponent,
    MostPopularComponent,
    ProfileComponent,
    AboutUsComponent,
    TermsAndConditionsComponent,
    StarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    MatSelectModule,
    MatFormFieldModule,
    // RatingModule,
    // StarRatingModule,
    NgxImageZoomModule,
    ArchwizardModule,
    BsDatepickerModule.forRoot(),
    NgxMaterialTimepickerModule,
    NgxSlideshowAcracodeModule,
    IvyCarouselModule,
    CarouselModule,
    SlideshowModule,

  ],
  providers: [
    CategoryService,
    ProductService,
    UserService,
    ProductResolver,
    ProductDetaiResolver,
    CategoryDetailResolver,
    CartService,
    CookieService,
    WhisListService,
    CurrencyService,
    CountryService,
    HomeService,
    HomeResolver,
    MostSellingProductsResolver,
    OtherService,
    UserProfileResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
