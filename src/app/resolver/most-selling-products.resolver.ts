import { Injectable } from '@angular/core';
import { ProductService } from './../services/product.service';
import { CurrencyService} from './../services/currency.service';

import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';



@Injectable()
export class MostSellingProductsResolver implements Resolve<any> {

  constructor(private productService: ProductService, private currencyService:CurrencyService) {

  }

  resolve() {
    return this.productService.getMostSellingProducts();
  }
}