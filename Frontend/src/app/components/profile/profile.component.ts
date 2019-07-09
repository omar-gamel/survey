import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  appUser: User;
  image;

  constructor(private userService: UserService, private auth: AuthService) {
    if (this.auth.isLogin()) {
      this.userService.getCurrentUser().subscribe(data => {
        (data.user) ? this.appUser = data.user : alert('Server Error ,Please Try Again');
        this.image = "http://localhost:5000/" + data.user.avatar
      });
    }

    this.auth.getUser().subscribe(user => {
      this.appUser = user;
    });
  }

}
