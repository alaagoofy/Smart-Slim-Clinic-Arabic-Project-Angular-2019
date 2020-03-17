import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImagesService } from 'src/app/services/images.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Http } from '@angular/http';




@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html'
})
export class AddArticleComponent {
  imgURL = null;
  imageName = null;
  fileToUpload = null;
  Image = null;
  public Editor = ClassicEditor;
  EditorData = null;
  success = false;
  id = null;
  Article = null;
  loadData = false;
  now = null;
  constructor(private Images: ImagesService,
    private articles: ArticlesService,
    private router: Router,
    private route: ActivatedRoute, private http: Http) {
    this.Article = {};
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.loadData = true;
      this.articles.getArticleByID(this.id).pipe(take(1)).subscribe(A => {
        if (A) {
          this.Article = A;
        }
        else {
        }
        this.loadData = false;
      })
    }
    else {
      this.Article = {
        ArtileBody: '<p></p>'
      };
    }
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.EditorData = data;
  }

  scrollToTop() {
    //Scroll to top
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
    //-------------------
  }


  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    this.Image = file.item(0);
    this.imageName = file.item(0).name;

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgURL = event.target.result;

    }
    reader.readAsDataURL(this.fileToUpload);
  }


  save(ArticleForm) {
    try {

      this.loadData = true;
      const formData: FormData = new FormData();
      formData.append('Image', this.Image, this.Image.name);
      this.http.post("http://smartslimclinics.com/api/Articles", formData).subscribe(res => {

        if (res.ok) {
          this.loadData = false;
          let ArticlesPath = "/assets/Articles/";
          this.now = formatDate(new Date(), 'dd-MM-yyyy hh:mm a', 'en');
          if (this.id) {
            let finalArticle = { ImageURL: ArticlesPath + this.imageName, Title: ArticleForm.Title, ArtileBody: this.EditorData, DateTime: this.now }
            this.articles.updateArticle(this.id, finalArticle);
            this.success = true;
            setTimeout(() => {
              this.router.navigate(['/admin/articlas']);
            }, 2000);
          }
          else {
            let finalArticle = { ImageURL: ArticlesPath + this.imageName, Title: ArticleForm.Title, ArtileBody: this.EditorData, DateTime: this.now }
            this.articles.addArticle(finalArticle)
            this.success = true;
            setTimeout(() => {
              this.router.navigate(['/admin/articlas']);
            }, 2000);
          }
          this.scrollToTop();
        }
      })


    }
    catch (e) {
      console.log(e)
    }
  }


}
