import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit, OnDestroy {


  unsubArticles: Subscription;
  Articles;


  constructor( private getArticles: ArticlesService) {
    this.unsubArticles = this.getArticles.getAll().subscribe(A => {
      this.Articles = A;
    })

   }

  ngOnInit() {
  }
  ngOnDestroy() {
  
    this.unsubArticles.unsubscribe();
   
  }
}
