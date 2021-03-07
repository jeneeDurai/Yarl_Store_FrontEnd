import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  public categories: any[];
  public filter_category = [];
  public filter_subcategory = [];


  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategoriesAndProducts().subscribe((data) => this.setCategories(data["data"]));
   // this.categoryService.getCategoryDetail(1).subscribe((data) => this.setSubcat(data["objectWise"]["subcategories"]));

  }


  setCategories = (categories) => {
    this.categories = categories;
  }

  setSubcat = (subcat) => {
    this.filter_subcategory = subcat;
  }

  setCategory = (event,category_id) => {
    if(event.target.checked)
    {
      this.filter_category.push(category_id);

    }else
    {
      this.filter_category = this.filter_category.filter(( id ) => id !== category_id);  
    }
   
    
  }


}
