import { Injectable } from '@angular/core';
import { ProductService } from './../services/product.service';
import { CurrencyService} from './../services/currency.service';

import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';



@Injectable()
export class ProductResolver implements Resolve<any> {

  constructor(private productService: ProductService, private currencyService:CurrencyService) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        if((position.coords.longitude >= 75 && position.coords.longitude < 81) == false)
        {
          this.currencyService.currencyFormat = '$';
          this.currencyService.currenyPosition = 'Left';
          
        }else
        {
          this.currencyService.currencyFormat = ' Rs';
          this.currencyService.currenyPosition = 'Left';
        }

      });    
    } else {
      // no can do
    }
  }

  resolve() {
    return this.productService.getTopSellingProducts();
  }
}