import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwiperOptions } from 'swiper';
import {CategoryService} from '../services/category.service';
import { CartService } from './../services/cart.service';
import { NotificationService } from './../services/notification.service';
import { WhisListService } from './../services/whislist.service';
import { CurrencyService } from './../services/currency.service';


@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {

  public products_details: any[] = [];
  public categories: any[];


  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    centeredSlides:true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 7
      },
      500: {
        slidesPerView: 3
      },
      400: {
        slidesPerView: 2
      },
      300: {
        slidesPerView: 1
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  };


  constructor(private categoryService:CategoryService,private route: ActivatedRoute,
    public currencyService:CurrencyService,
    private cartService:CartService,private notifyService:NotificationService,private wishlistService:WhisListService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategoriesAndProducts().subscribe((data) => this.setCategories(data["menu"]));

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


  setCategories = (categories) => {
    this.categories = categories;

    this.categories.forEach( (category) => {

      category.objectWise.products.forEach(product => {
        if(this.currencyService.currencyFormat === '$')
        {
          product.price = product.price / this.currencyService.convertionRate;
        }else
        {
          product.price = product.price;
        }
      });

    });


  }

  mouseOverEvent = ($event) => {
    console.log($event);
  }

  addToCart(product)
  {
   let  $rspn = this.cartService.addProuctsTocart(product);

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
