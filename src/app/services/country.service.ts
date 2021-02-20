import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseWrapper } from './response-wrapper';
import { CurrencyService } from './currency.service';

import { map } from "rxjs/operators"; 

@Injectable()
export class CountryService {

  getAllCountriesApi = 'http://frontend-api.yarlStore.com/api/location/country-index';
  getAllStatesApi = "http://frontend-api.yarlStore.com/api/location/country-view";
  getAllCityApi = "http://frontend-api.yarlStore.com/api/location/state-view";

  constructor(private http: HttpClient, private currencyService:CurrencyService) { }  


  getAllCountries():Observable<ResponseWrapper>
  {

    return this.http.get(this.getAllCountriesApi).pipe(map((res:Response) => {
      return res;
    }));
  }

  getAllStates(id):Observable<ResponseWrapper>
  {
    id = Number(id)

    return this.http.get(this.getAllStatesApi,{params:{id:id}}).pipe(map((res:Response) => {
      return res;
    }));
  }

  getCities(id):Observable<ResponseWrapper>
  {
    id = Number(id)

    return this.http.get(this.getAllCityApi,{params:{id:id}}).pipe(map((res:Response) => {
      return res;
    }));
  }

}

  
