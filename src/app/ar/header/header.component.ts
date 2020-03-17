import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  user;
  
  services;
  constructor(private checkuser : AuthService,private router : Router,private getServices : ServicesService) {
this.getServices.getAll().subscribe( S => {
  this.services = S;
})

   }

  ngOnInit() {

    this.checkuser.user$.subscribe(userCopy => {
      if(userCopy) {
        this.user = userCopy;
      console.log(this.user.email)
      }


    })
  }

  logoutUser(){
this.checkuser.logout();
this.router.navigateByUrl('/')

  }


}
