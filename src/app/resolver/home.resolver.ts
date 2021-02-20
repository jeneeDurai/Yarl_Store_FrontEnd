import { Injectable } from '@angular/core';
import { HomeService } from './../services/home.service';
import { CurrencyService} from './../services/currency.service';

import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';



@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private homeService: HomeService, private currencyService:CurrencyService) {
  }

  resolve() {
    return this.homeService.getSliders();
  }
}