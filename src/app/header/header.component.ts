import { Component, OnInit, Output, EventEmitter,HostListener } from '@angular/core';
import { CartService } from './../services/cart.service';
import { UserService } from './../services/user.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ActivatedRoute, Router} from '@angular/router';
import { WhisListService } from './../services/whislist.service';
import { NotificationService } from './../services/notification.service';
import { CategoryService } from './../services/category.service';
import { CurrencyService } from './../services/currency.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [       // metadata array
    trigger('toggleClick', [     // trigger block
    state('true', style({      // final CSS following animation
      right: '0',
      width:'400px'
    })),
    state('false', style({
      right: '-500px',
      width:'0'
    })),
    transition('true => false', animate('500ms')),  // animation timing
    transition('false => true', animate('500ms'))
  ])
]
})

export class HeaderComponent implements OnInit {

  public countCart:Number = 0;
  public showWishList:boolean = false;
  public whishlistProducts : any[] = [];
  public cartlistProducts : any[] = [];
  public showCartList:boolean = false;
  public showmenu:boolean = false;
  public categories : any[];
  public mainCatid : any;
  public subCategories: any[];
  public showSubCat: boolean = false;
  public fixedHeader : boolean =false;

  searchKey:string = '';



  constructor(
    public cartServices:CartService,
    public userService: UserService,
    private localStorage:LocalStorageService,
    private router:Router,
    public whislistService:WhisListService,
    private notifyService:NotificationService,
    private categoryService: CategoryService,
    public currencyService: CurrencyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => this.setCategories(data["data"]));


    this.countCart = this.cartServices.cart.length;
    if(this.localStorage.retrieve('wishList'))
    {
      this.whishlistProducts = this.localStorage.retrieve('wishList');
    }

    if(this.localStorage.retrieve('cart'))
    {
      this.cartlistProducts = this.localStorage.retrieve('cart');

    }


    this.route.queryParams.subscribe(params => {
      this.searchKey = params['key'];
    });
  
  }

  setCategories = (categories) => {
    this.categories = categories;
   }


  addProductToCart(product) {
    let  $rspn = this.cartServices.addProductToCart(product);

    if($rspn.message == 'Product Added to Cart')
    {
     this.notifyService.showSuccess("Product Added !!", "Success")
    }else
    {
     this.notifyService.showWarning("Product Already  Added !!", "Sorry")
    }

    this.whislistService.removeProduct(product);


  }

  @HostListener("window:scroll", [])
    onWindowScroll() {
      if(document.documentElement.scrollTop > 190)
      {
        this.fixedHeader = true
      }else
      {
        this.fixedHeader = false;
      }
    }

  removeProductCart(product)
  {
    this.cartlistProducts = this.cartServices.removeProduct(product);
  }


  removeProductWhishList(product)
  {
    this.whishlistProducts = this.whislistService.removeProduct(product);
  }

  logout()
  {
    this.userService.isLogged = false;
    this.localStorage.clear('token');
    this.localStorage.clear('username');
    this.router.navigate(['home']);

  }

  showList()
  {
    this.showWishList = !this.showWishList;
    this.showCartList = false;
  }

  showCart()
  {
    this.showCartList = !this.showCartList;
    this.showWishList = false;
  }

  profile()
  {
    this.router.navigate(['/profile']);
  }

  showMenu()
  {
    this.categoryService.showmenu = !this.categoryService.showmenu;
  }

  toogleMenu()
  {
    this.showmenu = !this.showmenu;
  }

  loadSubCategory()
  {
    this.categories.filter((cat) => {
      if(cat.id == this.mainCatid)
      {
        this.subCategories = cat.sub_categories;
      }
    });
  }

  searchProduct(){
    if(!this.searchKey){
      this.searchKey = "";
    }
    this.router.navigateByUrl('products?key='+ this.searchKey);
  }
}
