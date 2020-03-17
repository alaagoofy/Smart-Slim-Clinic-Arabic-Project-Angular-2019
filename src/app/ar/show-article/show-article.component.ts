import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {
  fillService;
  id;
  unsubscribe;
  loadData = true;
  constructor(private getArticles: ArticlesService, private router: Router, private route: ActivatedRoute) {

    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.unsubscribe = this.getArticles.getArticleByID(this.id).subscribe(service => {
        this.fillService = service;
        this.loadData = false;
      })
    }
  }

  ngOnInit() {
  }

}
