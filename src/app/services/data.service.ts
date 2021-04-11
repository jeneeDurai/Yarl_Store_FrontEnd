import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private filterSource = new BehaviorSubject(null);
  filterList = this.filterSource.asObservable();

  private productSource = new BehaviorSubject(null);
  productList = this.productSource.asObservable();


  constructor() { }

  updateFilter(filterList: any) {
    this.filterSource.next(filterList)
  }

  updateProduct(productList: any) {
    this.productSource.next(productList)
  }

  
}
