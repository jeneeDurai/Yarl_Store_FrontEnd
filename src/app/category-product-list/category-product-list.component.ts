import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CartService } from './../services/cart.service';
import { NotificationService } from './../services/notification.service';
import { WhisListService } from '../services/whislist.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-product-list',
  templateUrl: './category-product-list.component.html',
  styleUrls: ['./category-product-list.component.scss']
})
export class CategoryProductListComponent implements OnInit {

  public products_details: any[] = [];
  public category_details: any[];
  public subcategory_details : any[];

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

  constructor(private actRoute: ActivatedRoute,private cartService:CartService,private notifyService:NotificationService, private wishlistService:WhisListService) { }

  ngOnInit(): void {
    this.category_details = this.actRoute.snapshot.data['categoryDetails'].objectWise;
    this.products_details = this.actRoute.snapshot.data['categoryDetails'].objectWise.products;
    this.subcategory_details = this.actRoute.snapshot.data['categoryDetails'].objectWise.subcategories;

    console.log(this.products_details);
  }

  addToCart(product)
  {
   let  $rspn = this.cartService.addProuctsTocart(product);

   if($rspn.message == 'Product Added')
   {
    this.notifyService.showSuccess("Product Added !!", "Success")
   }else
   {
    this.notifyService.showWarning("Product Already  Added !!", "Sorry")
   }

  }

  addToWishList(product)
  {
    let  $rspn = this.wishlistService.addProuctsTocart(product);

    if($rspn.message === 'Product Added To Wishlist')
    {
     this.notifyService.showSuccess("Product Added !!", "Success")
    }else
    {
     this.notifyService.showWarning("Product Already  Added !!", "Sorry")
    }
  }

}
