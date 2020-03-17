import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Article } from '../Interfaces/Article.Interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private db: AngularFireDatabase) { }
  addArticle(Article) {
    this.db.list('/Articles').push(Article);
  }



  getAll(): Observable<Article[]> {
    return this.db.list<Article>('/Articles')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as Article;
            const id = c.payload.key;
            return { id, ...data };
          })
        )
      );
  }


  getArticleByID(ArticleID: string) {
   return this.db.object('/Articles/' + ArticleID).valueChanges();
  }


  updateArticle(ArticleID: string, Article) {
    return this.db.object('/Articles/' + ArticleID).update(Article);

  }

  DeleteArticle(ArticleID: string) {
    return  this.db.object('/Articles/' + ArticleID).remove();

  }

}
