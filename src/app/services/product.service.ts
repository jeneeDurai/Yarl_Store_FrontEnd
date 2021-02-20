import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseWrapper } from './response-wrapper';
import { CurrencyService } from './currency.service';

import { map } from "rxjs/operators";

@Injectable()
export class ProductService {

  getTopSelingProductsApi = '/yarl-store-services/products/popular/products';
  getProductDetailsApi = '/yarl-store-services/products/';
  //getMostSellingProductsApi = 'http://frontend-api.YarlStore.com/api/product/home-popular-products';
  getMostSellingProductsApi = '/yarl-store-services/products/popular/products';

  constructor(private http: HttpClient, private currencyService:CurrencyService) { }


  getTopSellingProducts():Observable<ResponseWrapper>
  {
    return this.http.get(this.getTopSelingProductsApi).pipe(map((res:Response) => {
      return res;
    }));
  }


  getProductDetails(id):Observable<ResponseWrapper>
  {
    return this.http.get(this.getProductDetailsApi + id).pipe(map((res:Response) => {
      console.log("response is ", res)
      return res;
    }));
  }


  getMostSellingProducts():Observable<ResponseWrapper>
  {

    return this.http.get(this.getMostSellingProductsApi).pipe(map((res:Response) => {
      console.log(res,'assdsaldnsa');
      return res;
    }));
  }



}
