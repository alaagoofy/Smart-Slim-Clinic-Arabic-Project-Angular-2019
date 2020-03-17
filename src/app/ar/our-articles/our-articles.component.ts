import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-our-articles',
  templateUrl: './our-articles.component.html',
  styleUrls: ['./our-articles.component.css']
})
export class OurArticlesComponent implements OnInit,OnDestroy {

  
  GetArticles;
  unsubscribe
  loadDataa = true;
  constructor(private router: Router, private articles: ArticlesService) {
    this.unsubscribe = this.articles.getAll().subscribe(article => {
      this.GetArticles = article;
      this.loadDataa = false;
    })
   }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
