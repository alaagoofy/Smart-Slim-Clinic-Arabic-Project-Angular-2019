import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ServicesService } from 'src/app/services/services.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {
  imgURL =  null;
  imageName = null;
  fileToUpload= null;
  Image = null;
 
  public Editor = ClassicEditor;
  EditorData;
  success = false;
  id;
   service;
  loadData = false;

  constructor(private services: ServicesService, private router: Router, 
    private route: ActivatedRoute,private http : Http) {
this.service = {};
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.loadData = true;
      this.services.getByID(this.id).pipe(take(1)).subscribe(A => {
        if (A) {
          this.service = A;
        }
        this.loadData = false;
      })
    }
    else {
      this.service = {
        serviceBody: ''
      };
    }
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.EditorData = data;
  }

scrollToTop(){
 //Scroll to top
 let scrollToTop = window.setInterval(() => {
  let pos = window.pageYOffset;
  if (pos > 0) {
    window.scrollTo(0, pos - 20); 
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

  save(service) {
    try {

      this.loadData = true ;
      const formData: FormData = new FormData();
      formData.append('Image', this.Image,this.Image.name);
      this.http.post("http://smartslimclinics.com/api/Articles", formData).subscribe(res => {
        if(res.ok){

          this.loadData = false ;
          let ArticlesPath = "/assets/Articles/";
      
      if (this.id) {
        let finalservice = { ImageURL: ArticlesPath + this.imageName, Title: service.Title, serviceBody: this.EditorData }
        this.services.update(this.id, finalservice)
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/admin/services']);
        }, 2000);
      }
      else {
        let finalservice = {ImageURL: ArticlesPath + this.imageName, Title: service.Title, serviceBody: this.EditorData}
        this.services.add(finalservice)
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/admin/services']);
        }, 2000);
      }
      this.scrollToTop();


        }

      })

    }
    catch (e) {

    }
  }

}
