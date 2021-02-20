import { Component, OnInit } from '@angular/core';
import { OtherService } from '../services/other.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  heading: string = '';
  content: string = '';
  constructor(private otherService: OtherService) { }

  ngOnInit(): void {
    this.otherService.getAboutUs().subscribe(
      (response) => {
        this.heading = response['data'][0].heading;
        this.content = response['data'][0].contents;
      })
  }

}
