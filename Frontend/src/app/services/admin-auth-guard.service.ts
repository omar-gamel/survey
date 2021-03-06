import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.userService.getCurrentUser()
      .pipe(map(data => {
        if (data.user.admin) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }))
  }

}
