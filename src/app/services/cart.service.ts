import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseWrapper } from './response-wrapper';
import { map } from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class CartService {

  cart:Array<any> = [];
  wishList: Array<any> = [];

  constructor(private http: HttpClient, private cookieService:CookieService, private localStorage:LocalStorageService) {

    if(this.localStorage.retrieve('cart') != null)
    {
      if(this.cart.length == 0 && this.cart.length != null)
      {
        this.cart = this.localStorage.retrieve('cart');
      }
    }


   }


  addProuctsTocart(product)
  {
    if(!this.cart.includes(product))
    {
      product['qnt'] = 1;
        this.cart.push(product);
        this.localStorage.store('cart',this.cart);
        return {message:'Product Added to Cart', status:200, success:true};
    }else
    {
      const foundIndex = this.cart.findIndex(({ id }) => id === product.id);

      this.cart[foundIndex].qnt++;
      this.localStorage.store('cart',this.cart);
        return {message:'Product Already Added', status:200, success:false};
    }

  }

  // addProuctsToWishList(product)
  // {
  //   if(!this.wishList.includes(product))
  //   {
  //     product['qnt'] = 1;
  //       this.wishList.push(product);
  //       this.localStorage.store('wishList',this.wishList);
  //       return {message:'Product Added', status:200, success:true};
  //   }else
  //   {
  //     const foundIndex = this.wishList.findIndex(({ id }) => id === product.id);

  //     this.wishList[foundIndex].qnt++;
  //     this.localStorage.store('wishList',this.wishList);
  //       return {message:'Product Already Added', status:200, success:false};
  //   }

  // }

  removeProduct(product) {
    const foundIndex = this.cart.findIndex(({ id }) => id === product.id);
    this.cart = this.cart.filter((_, index) => index !== foundIndex);
    this.localStorage.store('cart',this.cart);

      return this.cart;
  }

}
