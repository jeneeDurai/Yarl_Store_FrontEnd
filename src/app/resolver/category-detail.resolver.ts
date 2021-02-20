import { Injectable } from '@angular/core';
import { CategoryService } from './../services/category.service';

import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot,ActivatedRoute } from '@angular/router';


@Injectable()
export class CategoryDetailResolver implements Resolve<any> {

  constructor(private categoryService: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.categoryService.getCategoryDetail(Number(route.params['id']));
  }
}