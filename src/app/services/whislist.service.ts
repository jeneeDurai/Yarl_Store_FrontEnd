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
export class WhisListService {

  cart:Array<any> = [];

  constructor(private http: HttpClient, private cookieService:CookieService, private localStorage:LocalStorageService) {

    if(this.localStorage.retrieve('wishList') != null)
    {
        if(this.cart.length == 0)
        {
          this.cart = this.localStorage.retrieve('wishList');
        }
    }


   }


  addProductToCart(product)
  {
    if(!this.cart.includes(product))
    {
        this.cart.push(product);
        this.localStorage.store('wishList',this.cart);
        return {message:'Product Added To Wishlist', status:200, success:true};
    }else
    {
        return {message:'Product Already Added', status:200, success:false};
    }

  }

  removeProduct(product) {
    const foundIndex = this.cart.findIndex(({ id }) => id === product.id);
    this.cart = this.cart.filter((_, index) => index !== foundIndex);

    // this.cart.splice(index,1);
    this.localStorage.store('wishlist',this.cart);

    return this.cart;
  }





}
