import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseWrapper } from './response-wrapper';
import { map } from "rxjs/operators"; 

@Injectable()
export class CategoryService {

  getAllCategoriesApi = '/yarl-store-services/categories';
  getAllCategoriesAndProductsApi = "/yarl-store-services/categories/get-all-category-products";
  getCategoryDetails = 'http://frontend-api.YarlStore.com/api/categories/categories-view';
  
  public showmenu:boolean = false;
  constructor(private http: HttpClient) { }  
  
  getAllCategories():Observable<ResponseWrapper>
  {

    return this.http.get(this.getAllCategoriesApi).pipe(map((res:Response) => {
      return res;
    }));
  }


  getAllCategoriesAndProducts():Observable<ResponseWrapper>
  {

    return this.http.get(this.getAllCategoriesAndProductsApi).pipe(map((res:Response) => {
      return res;
    }));
  }


  getCategoryDetail(id):Observable<ResponseWrapper>
  {

    return this.http.get(this.getCategoryDetails,{params:{id:id}}).pipe(map((res:Response) => {
      return res;
    }));
  }

}