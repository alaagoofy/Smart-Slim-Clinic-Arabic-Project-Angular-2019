import { Component, OnDestroy } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements  OnDestroy {

  public Editor = ClassicEditor;
  EditorData = "";
  loadData = true;
  AboutUs;
  success = false;
  selectedLevel;
  id;
  title
  unSUb: Subscription;

  constructor(private getAboutUs: AboutService) {
    this.AboutUs = [{}];
    this.unSUb = this.getAboutUs.getAll().subscribe(Items => {
      this.AboutUs = Items;
      this.loadData = false;
      this.EditorData = Items[0].Body;
      this.title = Items[0].Title;
      this.id = Items[0].id;
    })
  }

  selected() {
    this.EditorData = this.selectedLevel.Body;
    this.id = this.selectedLevel.id;
    this.title = this.selectedLevel.Title;
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.EditorData = data;
    // console.log( data );
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

  save() {
    let finalsave = { Title: this.title, Body: this.EditorData }
    this.getAboutUs.update(this.id, finalsave)
    this.scrollToTop();
    this.success = true;
  }

  ngOnDestroy() {
    this.unSUb.unsubscribe();
  }
}
