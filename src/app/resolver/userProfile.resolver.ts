import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable()

export class UserProfileResolver implements Resolve<any> {

  constructor(private userService: UserService) {}
  resolve (route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.userService.getProfile(id);
  }
}
