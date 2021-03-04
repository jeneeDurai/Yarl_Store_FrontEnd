import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseWrapper } from './response-wrapper';
import { CurrencyService } from './currency.service';

import { map } from "rxjs/operators"; 

@Injectable()
export class HomeService {

  getSlidersApi = '/yarl-store-services/banners/enabled';

  constructor(private http: HttpClient, private currencyService:CurrencyService) { }  


  getSliders():Observable<ResponseWrapper>
  {

    return this.http.get(this.getSlidersApi).pipe(map((res:Response) => {
      return res;
    }));
  }


  

}