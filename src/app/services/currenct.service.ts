import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseWrapper } from './response-wrapper';
import { map } from "rxjs/operators"; 
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Injectable()
export class CurrencyService {

 public currencyFormat : String;
 public convertionRate : any;



 
  

}