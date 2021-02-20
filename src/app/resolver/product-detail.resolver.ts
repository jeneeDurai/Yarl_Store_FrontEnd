import { Injectable } from '@angular/core';
import { ProductService } from './../services/product.service';
import { CurrencyService} from './../services/currency.service';

import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class ProductDetaiResolver implements Resolve<any> {

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

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.productService.getProductDetails(id);
    // return this.productService.getProductDetails(Number(route.params['id']));
  }
}
