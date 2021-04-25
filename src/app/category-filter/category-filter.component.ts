import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {DataService} from '../services/data.service';

import { ActivatedRoute, Router,Params} from '@angular/router';
import { Subscription } from 'rxjs';

import { Options,LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  public categories: any[];
  public filter_subcategory = [];

  public brands = [];

  subscription: Subscription;

  filterObj: any  = {
    key: "",
    category: [],
    brand : []
  };

  filter_category : any = []; 

  minValue: number = 0;
  maxValue: number = 2000;

  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<span style='font-size:13px'>"+value+"</span>";
        case LabelType.High:
          return "<span style='font-size:13px'>"+value+"</span>";
        default:
          return value + " Rs";
      }
    }
  };


  constructor(private categoryService:CategoryService,private dataService:DataService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
   this.filterObj.key = this.route.snapshot.queryParams.key ? this.route.snapshot.queryParams.key : '';
   this.subscription = this.dataService.filterList.subscribe(
      (response:any) => {

        if(response){
          this.categories = [];
          this.brands = []
          console.log("message revieve to filter 111111");
          this.categories = response.category
          this.brands = response.brand
          this.filterObj.key = response.key ? response.key : ''
          console.log(response);
    
          console.log("message revieve to filter 2222222");
        }
      }
    )
  }


  setCategories = (categories) => {
    this.categories = categories;
  }

  setSubcat = (subcat) => {
    this.filter_subcategory = subcat;
  }


  setCategory = (event,category_name) => {

    if(event.target.checked){
      this.filterObj.category.push(category_name);
    }else{
      this.filterObj.category = this.filterObj.category.filter(( name ) => name !== category_name);  
    }

    console.log(this.filterObj.category)
    this.dataService.updateProduct(
      this.filterObj
    );
  }


  setBrand = (event,brand_name) => {

    if(event.target.checked){
      this.filterObj.brand.push(brand_name);
    }else{
      this.filterObj.brand = this.filterObj.brand.filter(( name ) => name !== brand_name);  
    }

    console.log(this.filterObj.brand)
    this.dataService.updateProduct(
      this.filterObj
    );
  }


  priceChanged(){
    console.log("minnnnn" + this.minValue);
    console.log("maxxxx" + this.maxValue);
    
    this.filterObj.minPrice = this.minValue
    this.filterObj.maxPrice = this.maxValue

    this.dataService.updateProduct(
      this.filterObj
    );
  }
}
