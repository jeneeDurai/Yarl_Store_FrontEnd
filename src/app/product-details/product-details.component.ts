import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { ProductService } from './../services/product.service';
import {CurrencyService} from './../services/currency.service';
import {CartService} from './../services/cart.service';
// import { StarRatingComponent } from 'ng-starrating';
import { NotificationService } from './../services/notification.service';
import Drift from 'drift-zoom';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WhisListService } from '../services/whislist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product_id: string;
  qnty : Number;
  image : any;
  zooom:any;
  images : any[];
  products_details:any[];
  brands: any;
  options: any;
  activeTab:any ='desc';
  reviewForm: FormGroup;
  hoverState = 0;
  stars= [1, 2, 3, 4, 5];
  rating = 0;
  public products: any[] = [
    {name: 'Rice', price:200,head: 'Keeri Samba',image:'rice_PNG45.png'},
    {name: 'Milk Powder',  price:80,head: 'Anchor',image:'anchor.jpeg'},
    {name: 'Wheat',price:50, head: 'White Wheat',image:'wheat_PNG107.png'},
    {name: 'Snaks', price:200,head: 'Doritos Tortilla Chips Barbeque 160g',image:'chips.jpeg'},
    {name: 'Cheese', price:200,head: 'Cheese',image:'rice_PNG45.png'},
    {name: 'Rice2',price:200, head: 'Dhal',image:'dal-png-chana-dal-800.png'},
    {name: 'Milk Powder',price:200, head: 'Ratthi Milk Powder Bib 400Gr',image:'ratthi.jpeg'},
    {name: 'Soap', price:200,head: 'Lifebuoy Soap Care 100G',image:'soap.jpeg'},
    {name: 'Cooking Oil', price:100,head: 'Marina Cooking Oil',image:'cooking-oil.jpeg'},
    {name: 'Noodels', price:200,head: 'Maggie noodels',image:'noodels.jpeg'},

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

  constructor(private actRoute: ActivatedRoute,
    private productService:ProductService,
    public currencyService:CurrencyService,
    private cartService: CartService,
    private notifyService:NotificationService,
    private fb: FormBuilder,
    private whisListService: WhisListService
  ) {
    // this.product_id = this.actRoute.snapshot.params.id;
    // this.productService.getProductDetails(this.product_id);
    this.reviewForm = this.fb.group({
      name: [null, [Validators.required]],
      comments: [null, [Validators.required]],
      // rating: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    addToCartForm: FormGroup;
    this.products_details = this.actRoute.snapshot.data['productDetails']['data'][0];
    console.log("product details ", this.products_details);
    var drift = new Drift(document.querySelector(".main-img"), {
      paneContainer: document.querySelector("p")
    });

      if(this.currencyService.currencyFormat === '$')
      {
        this.products_details['price'] =  this.products_details['price'] / this.currencyService.convertionRate;
      }else
      {
        this.products_details['price'] =  this.products_details['price'];
      }




    this.qnty = this.products_details['quantity'];
    this.image = this.products_details['images'][0].image_url+'?400';
    this.zooom = this.products_details['images'][0].image_url+'?1200';
    this.images = this.products_details['images'];
    document.querySelector(".main-img").setAttribute('data-zoom',this.zooom);

    if(this.products_details['brands'][0])
    {
      this.brands = this.products_details['brands'][0];

    }
    // if(this.products_details['options'][0])
    // {
    //   this.options = this.products_details['options'][0];

    // }else
    // {
    //   this.options = [];
    // }

    this.products_details['orderedQnty'] = 1;
    // console.log(this.options,'options')

  }

  //   ngOnInit(): void {
  //   this.products_details = this.actRoute.snapshot.data['productDetails'].products;

  //   var drift = new Drift(document.querySelector(".main-img"), {
  //     paneContainer: document.querySelector("p")
  //   });





  //     if(this.currencyService.currencyFormat === '$')
  //     {
  //       this.products_details['product'].price = this.products_details['product'].price / this.currencyService.convertionRate;
  //     }else
  //     {
  //       this.products_details['product'].price = this.products_details['product'].price;
  //     }


  //     console.log(this.products_details);


  //   this.qnty = this.products_details['product'].quantity;
  //   this.image = this.products_details['images'][0].image_url+'?400';
  //   this.zooom = this.products_details['images'][0].image_url+'?1200';
  //   this.images = this.products_details['images'];
  //   document.querySelector(".main-img").setAttribute('data-zoom',this.zooom);

  //   if(this.products_details['brands'][0])
  //   {
  //     this.brands = this.products_details['brands'][0];

  //   }
  //   if(this.products_details['options'][0])
  //   {
  //     this.options = this.products_details['options'][0];

  //   }else
  //   {
  //     this.options = [];
  //   }

  //   this.products_details['product'].orderedQnty = 1;


  //   console.log(this.options,'options')
  // }

  tabNavigator(tab)
  {
    this.activeTab = tab;
  }

  // onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
  //   alert(`Old Value:${$event.oldValue},
  //     New Value: ${$event.newValue},
  //     Checked Color: ${$event.starRating.checkedcolor},
  //     Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  // }

  public dispImage(image)
  {

    this.image = image+'?400';
    this.zooom = image+'?1200';
    document.querySelector(".main-img").setAttribute('data-zoom',this.zooom);
    console.log(this.zooom,'images');
  }


  addProductToCart(product) {
    let  $rspn = this.cartService.addProuctsTocart(product);

    if($rspn.message == 'Product Added to Cart')
    {
     this.notifyService.showSuccess("Product Added !!", "Success")
    }else
    {
     this.notifyService.showWarning("Product Already  Added !!", "Sorry")
    }
  }

  addProductToWishList(product) {
    let  $rspn = this.whisListService.addProuctsTocart(product);
console.log("rspn",$rspn)
    if($rspn.message == 'Product Added To Wishlist')
    {
     this.notifyService.showSuccess("Product Added !!", "Success")
    }else
    {
     this.notifyService.showWarning("Product Already  Added !!", "Sorry")
    }
  }

  increaseQnty(orderedQnty)
  {
    if(orderedQnty != 10)
    {
      orderedQnty++;
      this.products_details['orderedQnty'] = orderedQnty;


    }
  }

  decreaseQnty(orderedQnty)
  {
    if(orderedQnty != 1)
    {
      orderedQnty--;
    this.products_details['orderedQnty'] = orderedQnty;


    }
  }

  onRateEnter(starId: number) {
    this.hoverState = starId;
  }

  onRateLeave() {
    this.hoverState = 0;
  }

  onRateClicked(starId: number) {
    this.rating = starId;
  }
  onSubmitReview() {
    const body = {
      name: this.reviewForm.get('name').value,
      comments: this.reviewForm.get('comments').value,
      rating: this.rating,
      productId: this.products_details['id']
    }
    console.log("values ",body)
  }

}
