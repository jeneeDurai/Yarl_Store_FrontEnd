import { Component, OnInit } from '@angular/core';
import { CurrencyService} from './../services/currency.service';
import { CartService} from './../services/cart.service';
import { CountryService} from './../services/country.service';
import {UserService} from './../services/user.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {FormGroup, Validators, FormBuilder,FormControl} from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  CheckoutForm: FormGroup;
  public cartProducts : any;
  public totalPrice : any;
  public qnty: Number = 1;
  public total: any[] = [] ;
  public countries: any[];
  public states: any[];
  public cities: any[];
  public userList1: any;
  lastkeydown1: number = 0;

  public create_an_account:boolean = false;
  constructor(public currencyService:CurrencyService,
    private cartService:CartService,
    private fb: FormBuilder,
    private localStorage:LocalStorageService,
    private countryService:CountryService,
    public userService:UserService) {

    }

  ngOnInit(): void {

    this.CheckoutForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,20})+$/i),Validators.email]),
      contactno: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address1: new FormControl('', [Validators.required])
    })


    this.getCountries();

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

  get f(){
    return this.CheckoutForm.controls;
  }

  onChange($event)
  {
   if($event.target.checked)
   {
     this.create_an_account = true;
   }else
   {
    this.create_an_account = false;
   }
  }

  calculate(product)
  {
    this.total[product.id] = Number(product.orderedQnty) * product.price;
    this.totalPrice = this.total.reduce((acc, cur) => acc + Number(cur), 0);

  }


  getCountries()
  {
    this.countryService.getAllCountries().subscribe((data) => this.setCountries(data));


  }

  setCountries(countries)
  {
    this.countries = countries.dataProvider;
    console.log(this.countries);
  }

  onChangeConuty(country)
  {
    this.getStates(country);
  }

  getStates(country)
  {
    this.countryService.getAllStates(country).subscribe((data) => this.states = data['dataProvider']);
  }

  onChangeState(state)
  {
    this.getCity(state);
  }

  getCity(state)
  {
    this.countryService.getCities(state).subscribe((data) => this.cities = data['dataProvider']);
    console.log(this.cities);
  }

  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.cities, userId);
      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };


}


