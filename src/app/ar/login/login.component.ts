import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage;
  successMessage;
  returnUrl: string;
  loading = false;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {


  this.authService.user$.pipe(map(
    user => {
      if (user) {
        console.log(user.email);




      } else {

      }
    }
  ));

  }


  ngOnInit() {
    // reset login status

    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/ar/home';
}

 loginUser(UserInfo: NgForm) {
  this.loading = true;
  const user = {
    email: UserInfo.controls.txtEmail.value,
    password: UserInfo.controls.txtPassword.value
  };
  this.authService.login(user)
  .then(res => {
    this.errorMessage = false;
    this.successMessage = true;
    this.loading = false;

  }, err => {
    this.loading = false;
    this.errorMessage = true;
    this.successMessage = false;
  });



 }



}
