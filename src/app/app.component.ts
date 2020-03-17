import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {




  constructor(
    private getUser: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.getUser.user$.subscribe(user => {
      if (user) {
        this.getUser.save(user)
        let returnURL = this.route.snapshot.queryParamMap.get('returnURL');
        if (returnURL) {
          router.navigateByUrl(returnURL);
        }

      }
      else {

      }
    })
  }
  onActivate(event) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}
