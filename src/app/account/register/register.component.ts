import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {FormGroup, FormBuilder,FormControl, Validators} from '@angular/forms';
import { sha256, sha224 } from 'js-sha256';
import { NotificationService } from './../../services/notification.service';
// import * as crypto from 'crypto-js';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  public firstName : any = '';
  public lastName : any;
  public email : any;
  private password : any;
  registerForm: FormGroup;
  private hashed_password: string;

  constructor(private userService:UserService,public fb: FormBuilder, private notifyService:NotificationService) { }


  ngOnInit(): void {

    this.registerForm = this.fb.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$)[a-zA-Z\s]*$/)])],
      'lastName': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$)[a-zA-Z\s]*$/)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,20})+$/i)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z\d$@$!%*#?&^\S]*$/)])]
  })
  }

  async saveDetails()
  {

    // const formData = new FormData();
    // formData.append('SignupForm[username]',  this.registerForm.get('firstName').value + ' ' + this.registerForm.get('lastName').value);
    // formData.append('SignupForm[password]', this.registerForm.get('password').value);
    // formData.append('SignupForm[email]', this.registerForm.get('email').value);

    // var registerDetails = {
    //   User : [
    //     {'username' : this.registerForm.get('firstName').value + '' + this.registerForm.get('lastName').value},
    //     {'password' : sha256(this.registerForm.get('password').value) },
    //     {'email'    : this.registerForm.get('email').value }
    //   ]
    // };
    await this.userService.hashPassword(this.registerForm.get('password').value).then(value => {
      this.hashed_password = value
    })

    const body = {
      username: this.registerForm.get('firstName').value + ' ' + this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      // password_hash: crypto.AES.encrypt("pass", this.registerForm.get('password').value).toString()
      password_hash: this.hashed_password
    }
    this.userService.register(body).subscribe({
      next: data => {
        console.log("dta is", data)
        if(data['success']) {
          this.notifyService.showSuccess(data['message'], "Success")
          this.registerForm.reset();
        }else
        {
          this.notifyService.showError(data['message'], "Error")
        }
      },
      error: error => this.notifyService.showError(error.error.message, "Error")
    });


  }




}
