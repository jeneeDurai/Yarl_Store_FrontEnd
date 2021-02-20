import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { CartService } from './../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from './../services/notification.service'
import { WhisListService } from './../services/whislist.service';
import { CurrencyService } from './../services/currency.service';
@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {

  public products_details: any[] = [];

  @Output() productAdded = new EventEmitter();


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


  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private notifyService : NotificationService, private wishlistService:WhisListService,
    public currencyService:CurrencyService
    ) {

  }

  ngOnInit(): void {

    this.products_details = this.route.snapshot.data['products'].products;



    this.products_details.forEach( (product_detail) => {

      if(this.currencyService.currencyFormat === '$')
      {
        product_detail.product.price = product_detail.product.price / this.currencyService.convertionRate;
      }else
      {
        product_detail.product.price = product_detail.product.price;
      }

    });


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