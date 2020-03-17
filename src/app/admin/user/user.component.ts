import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private authService: AuthService) { }

  errorMessage;
  successMessage;

  loading = false;


  addUser(UserInfo: NgForm) {
    this.loading = true;
    const user = {
        email: UserInfo.controls.txtEmail.value,
        password: UserInfo.controls.txtPassword.value
      };
    this.authService.rigster(user)
      .then(res => {
        this.errorMessage = false;
        this.successMessage = true;
        this.loading = false;
      }, err => {
        this.loading = false;
        this.errorMessage = err.message;
        this.successMessage = false;
      });




  }





}
