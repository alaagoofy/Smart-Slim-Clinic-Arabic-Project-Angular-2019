import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, distinctUntilChanged } from 'rxjs/operators';
import { service } from 'src/app/Interfaces/service.Interface';


@Component({
  selector: 'app-showservice',
  templateUrl: './show-service.component.html',
  styleUrls: ['./show-service.component.css']
})
export class ShowServiceComponent implements OnInit, OnDestroy {




  private _id;
  get id(): string {
    return this._id;
  }
  set id(val: string) {
    this._id = val;
    if (this._id) {
      this.unsubscribe =  this.getService.getByID(this._id).subscribe(S => {
        if (S){
          this.fillService  = S ;
        }
     
      })
      console.log(this.fillService)
        this.loadData = false;
      
    }
  }
  unsubscribe: Subscription;
  loadData = true;
  unsubRouter: Subscription;

   fillService;
  constructor(private getService: ServicesService, private router: Router, private route: ActivatedRoute) {

    this.unsubRouter = this.router.events.subscribe(val => {
      const x = this.route.snapshot.paramMap.get('id');
      if (x && this.id != x) {
        this.id = x;
        this.scrollToTop();

      }

    });

    // console.log(this.id)


  }
scrollToTop() {
  // scroll
  const scrollToTop = window.setInterval(() => {
    const pos = window.pageYOffset;
    if (pos > 0) {
      window.scrollTo(0, pos - 20); // how far to scroll on each step
    } else {
      window.clearInterval(scrollToTop);
    }
  }, 16);
}
  ngOnInit() {


  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
    this.unsubRouter.unsubscribe();
  }

}
