import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { ProductResolver } from './resolver/product.reslover';
import { ProductDetaiResolver } from './resolver/product-detail.resolver';
import { CategoryProductListComponent } from './category-product-list/category-product-list.component';
import { CategoryDetailResolver } from './resolver/category-detail.resolver';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeResolver } from './resolver/home.resolver';
import {ProfileComponent} from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsAndConditionsComponent  } from './terms-and-conditions/terms-and-conditions.component';
import { MostSellingProductsResolver } from './resolver/most-selling-products.resolver';
import {MostPopularComponent} from './most-popular/most-popular.component';
import { UserProfileResolver } from './resolver/userProfile.resolver';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,resolve: { hnData: ProductResolver, banners:HomeResolver,products:MostSellingProductsResolver } },
  { path: 'account', component: AccountComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path : 'product-detail/:id', component: ProductDetailsComponent, pathMatch: 'full',resolve: {productDetails:ProductDetaiResolver}},
  { path : 'category/:id', component: CategoryProductListComponent,resolve:{categoryDetails:CategoryDetailResolver}},
  { path : 'products', component: CategoryProductListComponent},
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'user/:id', component: ProfileComponent, resolve: {userProfile: UserProfileResolver} },
  { path: 'most-selling-products', component: MostPopularComponent,resolve:{products:MostSellingProductsResolver} },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
