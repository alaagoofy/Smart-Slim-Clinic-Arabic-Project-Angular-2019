import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Subscription } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  pageloading = true;

  Services;
  Doctors;
  Articles;
  firstBodyMath;
  finalResult;
  mathMsg;
  mathClass;
  iconClass;

  unsubServices: Subscription;
  unsubDoctors: Subscription;
  unsubArticles: Subscription;


  bodyMathTool(weight, height) {
    this.firstBodyMath = height * height;
    this.finalResult = weight / this.firstBodyMath;
    if (this.finalResult < 15) {
      this.mathMsg = 'لديك نقص حاد جدا فى الوزن ';
      this.mathClass = 'alert alert-danger animated shake';
      this.iconClass = 'fa fa-exclamation-triangle fa-1x';
    } else if (this.finalResult >= 15 && this.finalResult <= 16) {
      this.mathMsg = 'لديك نقص حاد  فى الوزن  ';
      this.mathClass = 'alert alert-danger animated shake';
      this.iconClass = 'fa fa-exclamation-triangle fa-1x';
    } else if (this.finalResult >= 16 && this.finalResult <= 18.5) {
      this.mathMsg = 'لديك نقص  فى الوزن ';
      this.mathClass = 'alert alert-warning animated shake';
      this.iconClass = 'fa fa-exclamation-triangle fa-1x';
    } else if (this.finalResult >= 18.5 && this.finalResult <= 25) {
      this.mathMsg = 'لديك وزن طبيعى  ';
      this.mathClass = 'alert alert-success animated zoomInLeft';
      this.iconClass = 'fa fa-check fa-1x';
    } else if (this.finalResult >= 25 && this.finalResult <= 30) {
      this.mathMsg = 'لديك وزن زائد ';
      this.mathClass = 'alert alert-warning animated shake';
      this.iconClass = 'fa fa-exclamation-triangle fa-1x';
    } else if (this.finalResult >= 30) {
      this.mathMsg = 'لديك وزن زائد جدا ';
      this.mathClass = 'alert alert-danger animated shake';
      this.iconClass = 'fa fa-exclamation-triangle fa-1x';
    } else {
      this.mathMsg = 'من فضلك أدخل البيانات كما هو موضح فى المثال';
      this.mathClass = 'alert alert-danger animated shake';
      this.iconClass = 'fa fa-exclamation-triangle fa-1x';
    }
  }
  constructor(private getServices: ServicesService, private getDoctors: DoctorsService, private getArticles: ArticlesService) {
    this.unsubServices = this.getServices.getAll().subscribe(s => {
      this.Services = s;
    });



    this.unsubDoctors = this.getDoctors.getAll().subscribe(D => {
      this.Doctors = D;
    });


    this.unsubArticles = this.getArticles.getAll().subscribe(A => {
      this.Articles = A;
      this.pageloading = false;
    });
    
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.unsubServices.unsubscribe();
    this.unsubDoctors.unsubscribe();
    this.unsubArticles.unsubscribe();

  }
}
