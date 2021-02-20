import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import {CategoryService} from './../services/category.service';
import { ActivatedRoute } from '@angular/router';

export interface IImage {
  url: string | null;
  href?: string;
  clickAction?: Function;
  caption?: string;
  title?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {


  public categories: any[];
  public showSubCat: boolean = false;
  public mainCatid : any;
  public subCategories: any[];
  public banners: any;
  public slider1_images : any;
  public silder2_images : any;
  

  images = [];
  images2 = [];


  
  public slideData: any[] = [
    {name: 'Value of the day', isMain : true},
    {name: 'Top 100 Offers',  isMain : true},
    {name: 'New Arrivals', isMain: true},
    {name: 'Gadgets', isMain: false},
    {name: 'TV & Audio',isMain: false},
    {name: 'All in one', isMain: false},
    {name: 'Gaming', isMain: false},
    {name: 'Laptops', isMain: false},
    {name: 'Virus Guards', isMain: false},
    {name: 'Ultra Books', isMain: false},
    {name: 'Gaming', isMain: false},
    {name: 'Laptops', isMain: false},


  ];

  imageUrls=[
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg', caption: 'The first slide', href: '#config' },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' }
  ];


  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 1
      },
      500: {
        slidesPerView: 1
      },
      400: {
        slidesPerView: 1
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


  constructor(public categoryService:CategoryService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => this.setCategories(data["menu"]));
    this.banners = this.route.snapshot.data['banners'];
    this.setBannerImages(this.banners['banners']);
    // this.banner_images[0] = this.banners['banners'][0].images;
    // console.log(this.banner_images,'banners');

  }

  setBannerImages = (images) => {
    let test = [];
     this.slider1_images = images[0]['images'];
     this.silder2_images = images[1]['images'];

     this.slider1_images.forEach(image => {
       this.images.push({path:image.image});
     });

     this.silder2_images.forEach(image => {
      this.images2.push({path:image.image});
    });

  }


  setCategories = (categories) => {
   this.categories = categories;
   console.log(this.categories);
  }

  mouseOverEvent = ($event) => {
    console.log($event);
  }

  test()
  {
    this.categories.filter((cat) => {
      if(cat.id == this.mainCatid)
      {
        this.subCategories = cat.subCategory;
      }
    });
  }
}
