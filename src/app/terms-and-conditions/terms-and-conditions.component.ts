import { Component, OnInit } from '@angular/core';
import { OtherService } from '../services/other.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  heading: string = '';
  content: string = '';

  constructor(private otherService: OtherService) { }

  ngOnInit() {
    this.otherService.getTermsAndCondition().subscribe(
      (response) => {
        this.heading = response['data'][0].heading;
        this.content = response['data'][0].contents;
      })
  }

}
