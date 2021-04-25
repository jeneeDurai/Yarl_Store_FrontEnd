import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CartService } from './../services/cart.service';
import { NotificationService } from './../services/notification.service';
import { WhisListService } from '../services/whislist.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ProductService } from './../services/product.service';
import {DataService} from '../services/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-category-product-list',
  templateUrl: './category-product-list.component.html',
  styleUrls: ['./category-product-list.component.scss']
})
export class CategoryProductListComponent implements OnInit {

  public products_details: any[] = [];
  public category_details: any[];
  public subcategory_details : any[];
  subscription: Subscription;

  orderByList: string[] = ["Best Match", "Price High to Low","Price Low to High"];
  products:any[] = [];

  filterForm:FormGroup;
  filterObj :any = {
   category: [],
   brand: []
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>' ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 10
      }
    },
    nav: true
  }

  constructor(private dataService:DataService,private fb: FormBuilder,private productService:ProductService, private actRoute: ActivatedRoute,private cartService:CartService,private notifyService:NotificationService, private wishlistService:WhisListService) { }

  ngOnInit(): void {

    this.subscription = this.dataService.productList.subscribe(
      (response:any) => {
        console.log("message revieve to product 111111");
        console.log(response);
        console.log("message revieve to product 222222");
        if(response){
          this.searchProduct(response,false);
        }
      }
    )


    this.actRoute.queryParams.subscribe(params => {
      this.searchProduct(params, true);
    });

    this.filterForm = this.fb.group({
      selectOption: this.orderByList[0],
    });
  }

  addToCart(product)
  {
   let  $rspn = this.cartService.addProductToCart(product);

   if($rspn.message == 'Product Added to Cart')
   {
    this.notifyService.showSuccess("Product Added !!", "Success")
   }else
   {
    this.notifyService.showWarning("Product Already  Added !!", "Sorry")
   }

  }

  addToWishList(product)
  {
    let  $rspn = this.wishlistService.addProductToCart(product);

    if($rspn.message === 'Product Added To Wishlist')
    {
     this.notifyService.showSuccess("Product Added !!", "Success")
    }else
    {
     this.notifyService.showWarning("Product Already  Added !!", "Sorry")
    }
  }


  changeSorting(){
    if(this.filterForm.get('selectOption').value == "Price High to Low"){
      this.products.sort(function(a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
      });
    }else{
      this.products.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
      });
    }
  }
  

  searchProduct(filter, isInitialLoad){
    this.filterObj = {
      key: filter.key,
      category: [],
      brand: []
     }
     this.products = [];
    this.productService.searchProduct(filter).subscribe(
      (response:any)=>{
        this.products = response.data;
        this.products.forEach (element => {
          if(element.categories.length != 0){
            if(this.filterObj.category.filter(cat => cat.category_name == element.categories[0].category_name) != 0 ){
              this.filterObj.category.map( cat => cat.category_name == element.categories[0].category_name ? cat.count++ : '');
            }else{
              this.filterObj.category.push(
                  {
                    category_name : element.categories[0].category_name,
                    count : 1
                  }
                )
            }
          }
          if(element.brands.length != 0){
            if(this.filterObj.brand.filter(cat => cat.category_name == element.brands[0].brands_name) != 0 ){
              this.filterObj.brand.map( cat => cat.category_name == element.brands[0].brands_name ? cat.count++ : '');
            }else{
              this.filterObj.brand.push(
                  {
                    brands_name : element.brands[0].brands_name,
                    count : 1
                  }
                )
            }
          }
        })
        if(isInitialLoad){
          this.dataService.updateFilter(this.filterObj);
        }
      },(error) =>{
  
      }
    )
  }
}
