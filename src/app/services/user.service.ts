import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseWrapper } from './response-wrapper';
import { map } from "rxjs/operators";
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Injectable()
export class UserService {

  registerApi = '/yarl-store-services/register';
  loginApi = '/yarl-store-services/login';
  getProfileApi = '/yarl-store-services/user/'
  isLogged:boolean = false;
  constructor(private http: HttpClient,private localStorage:LocalStorageService)
  {
    if(this.localStorage.retrieve('token'))
    {
      this.isLogged = true;
    }

   }

  register(user):Observable<ResponseWrapper>
  {
    console.log("user is", user);
    return this.http.post(this.registerApi,user).pipe(map((res:Response) => {
      return res;
    }));

    // this.http.post(this.registerApi, { title: 'Angular POST Request Example' }).subscribe({
    //     next: data => console.log(data),
    //     error: error => console.error('There was an error!', error)
    //     });
  }


  login(user):Observable<ResponseWrapper>
  {
    console.log(user,' user');
    return this.http.post(this.loginApi,user).pipe(map((res:Response) => {
      return res;
    }));
  }

  getProfile(userId): Observable<any> {
    return this.http.get(this.getProfileApi + userId).pipe(
      map((res: Response) => {
        console.log("response profile ", res);
        return res;
      }));
  }
   sha256(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return window.crypto.subtle.digest('SHA-256', data);
  }

   bufferToBase64UrlEncoded (input: ArrayBuffer) {
    const bytes = new Uint8Array(input);
    return this.urlEncodeBase64(window.btoa(String.fromCharCode(...bytes)));
  }

   urlEncodeBase64 (input: string) {
    const chars = {'+': '-', '/': '_', '=': ''};
    return input.replace(/[\+\/=]/g, m => chars[m]);
  }

  async hashPassword(password) {
    const shaBuffer = await this.sha256(password);
    const encoded = this.bufferToBase64UrlEncoded(shaBuffer);
   return encoded;

  }
}
