import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImagesService } from 'src/app/services/images.service';

import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { DoctorsService } from 'src/app/services/doctors.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {

  imgURL = null;
  imageName = null;
  fileToUpload = null;
  Image = null;


  public Editor = ClassicEditor;
  EditorData = null;
  success = false;
  id = null;
  doctor = null;
  loadData = false;

  constructor(private doctors: DoctorsService, private router: Router,
     private route: ActivatedRoute,private http: Http) {
    this.doctor = {};
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.loadData = true;
      this.doctors.getByID(this.id).pipe(take(1)).subscribe(A => {
        if (A) {
          this.doctor = A;
        }
        this.loadData = false;
      })
    }
    else {
      this.doctor = {
        doctorBody: ''
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

  save(doctor) {
    try {

      this.loadData = true;
      const formData: FormData = new FormData();
      formData.append('Image', this.Image, this.Image.name);
      this.http.post("http://smartslimclinics.com/api/Articles", formData).subscribe(res => {
        if(res.ok){

          this.loadData = false;
          let ArticlesPath = "/assets/Articles/";
          
     
      if (this.id) {
        let finaldoctor = { ImageURL: ArticlesPath + this.imageName, DrName: doctor.DrName, doctorBody: this.EditorData };
        this.doctors.update(this.id, finaldoctor);
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/admin/doctorsCP']);
        }, 2000);
      }
      else {
        let finaldoctor = { ImageURL: ArticlesPath + this.imageName, DrName: doctor.DrName, doctorBody: this.EditorData };
        this.doctors.add(finaldoctor);
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/admin/doctorsCP']);
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
