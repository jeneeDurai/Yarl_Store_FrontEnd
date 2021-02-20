import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { UserService } from '../../services/user.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ActivatedRoute, Router} from '@angular/router';
import { NotificationService } from './../../services/notification.service';

  // import { sha1 } from '@angular/compiler/src/core';
  // import * as crypto from 'crypto-js';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  LoginForm: FormGroup;
  isLoggedIn:boolean = false;
  isAdmin:boolean = false;
   hashed_password: string;
  constructor(private fb: FormBuilder, private userService: UserService,private localStorage:LocalStorageService, private router:Router, private notifyService:NotificationService) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,20})+$/i)])],
      'password': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z\d$@$!%*#?    &^\S]*$/)])]
  })
  }


  async login() {
    // const formData = new FormData();
    // formData.append('LoginForm[email]', this.LoginForm.get('email').value);
    // formData.append('LoginForm[password]', this.LoginForm.get('password').value);
    await this.userService.hashPassword(this.LoginForm.get('password').value).then(value => {
      this.hashed_password = value
    })
    const body = {
      email: this.LoginForm.get('email').value,
      // password: crypto.AES.encrypt("pass", this.LoginForm.get('password').value).toString()
      // password: this.userService.hashPassword(this.LoginForm.get('password').value).then( value => {
      //   return value;
      password: this.hashed_password
      }
    this.userService.login(body).subscribe(response => {
      if(response['success']){

        this.localStorage.store('token',response['data'].access_token);
        this.localStorage.store('username',response['data'].username);
        console.log("Logged innn")
        this.router.navigate(['/home']);
        this.isLoggedIn = true;
        this.userService.isLogged = true;

      }else{
        this.notifyService.showError(response['message'], "Error")
      }
      console.log(response)
    }, error => {
        console.log(error)
    })
  }
}
