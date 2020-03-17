import { Component, OnDestroy } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnDestroy {
  subscribtion: Subscription = new Subscription();

  public About;
  public Mission ;
  public Vision ;
  pageloading = true;

  constructor(private getAboutUs: AboutService) {

    this.subscribtion.add(
      this.getAboutUs.getByID(1).subscribe(about => {
        this.About = about;
      }))
    this.subscribtion.add(
      this.getAboutUs.getByID(2).subscribe(mission => {
        this.Mission = mission;
      }))
    this.subscribtion.add(
      this.getAboutUs.getByID(3).subscribe(vision => {
        this.Vision = vision;
        this.pageloading= false;
      }))

  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
