import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: any = [];
  name: string;
  email: string;
  image: any;
  contact_number: string;
  address: string;
  country: string;
  city: string;
  state: string;
  postal_code: number;
  profileForm: FormGroup;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userProfile = this.activatedRoute.snapshot.data['userProfile']['data'];
    this.name = this.userProfile.username;
    this.email = this.userProfile.email;
    this.image = this.userProfile.image;
    this.contact_number = this.userProfile.mobile;

    this.profileForm = this.fb.group({
      name: [this.name, [Validators.required]],
      email: [this.email, [Validators.required]],
      image: [this.image, [Validators.required]],
      contact_number: [this.contact_number, [Validators.required]],
      address: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      postal_code: [null, [Validators.required]]
    })
  }

}
