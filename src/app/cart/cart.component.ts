import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { CartService } from './../services/cart.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  public cartProducts : any;
  public totalPrice : any;
  public qnty: Number = 1;
  public total: any[] = [] ;
  public prodcts: any[] = [
    {name: 'Rice', head: 'Keeri Samba',image:'rice_PNG45.png'},
    {name: 'Milk Powder', head: 'Anchor',image:'anchor.jpeg'},
    {name: 'Wheat', head: 'White Wheat',image:'wheat_PNG107.png'},
    {name: 'Snaks', head: 'Doritos Tortilla Chips Barbeque 160g',image:'chips.jpeg'},
    {name: 'Cheese', head: 'Cheese',image:'rice_PNG45.png'},
    {name: 'Rice2', head: 'Dhal',image:'dal-png-chana-dal-800.png'},
    {name: 'Milk Powder', head: 'Ratthi Milk Powder Bib 400Gr',image:'ratthi.jpeg'},
    {name: 'Soap', head: 'Lifebuoy Soap Care 100G',image:'soap.jpeg'},
    {name: 'Cooking Oil', head: 'Marina Cooking Oil',image:'cooking-oil.jpeg'},
    {name: 'Noodels', head: 'Maggie noodels',image:'noodels.jpeg'},

  ];


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
        slidesPerView: 5
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

  constructor(private cartService:CartService,private localStorage:LocalStorageService, private router:Router) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.cart;

    if(this.cartProducts.length == 0) {
      this.cartProducts = this.localStorage.retrieve('cart');
    }


    this.cartProducts.filter((product) => {
        product.orderedQnty = product.qnt;
        this.total[product.id] = product.price;
    })

    this.totalPrice = this.total.reduce((acc, cur) => acc + Number(cur), 0);


  }

  rmvProduct(product) {
    if(this.cartService.removeProduct(product))
    {
      this.cartProducts = this.cartService.removeProduct(product);
    }

  }

  calculate(product)
  {
    this.total[product.id] = Number(product.orderedQnty) * product.price;
    this.totalPrice = this.total.reduce((acc, cur) => acc + Number(cur), 0);

  }

  checkOut()
  {
    this.localStorage.store('cart',this.cartProducts);
    this.router.navigate(['checkout']);
  }

  clearCart()
  {
    this.cartService.cart = [];
    this.localStorage.store('cart',[]);
    this.router.navigate(['home'])
  }

  increaseQnty(product)
  {
    if(product.orderedQnty != 10)
    {
      product.orderedQnty++;
    }
  }

  decreaseQnty(product)
  {
    if(product.orderedQnty != 1)
    {
      product.orderedQnty--;

    }
  }

}
