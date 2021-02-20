import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()

export class OtherService {
  getAboutUsApi = 'http://127.0.0.1:5000/aboutus';
  getTermsAndConditionApi = 'http://127.0.0.1:5000/termsandcondition'

  constructor(private http: HttpClient) {}

  getAboutUs() {
    return this.http.get(this.getAboutUsApi);
  }

  getTermsAndCondition() {
    return this.http.get(this.getTermsAndConditionApi);
  }
}
