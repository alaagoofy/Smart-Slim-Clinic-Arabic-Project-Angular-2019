import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  url = "http://smartslimclinics.com/api/Articles";



  constructor(private http: Http) { }
  getAll(folderpath) {
    return this.http.get(this.url + folderpath);
  }


  saveImg(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload,fileToUpload.name);
    this.http.post(this.url, formData);
  }




  delete(folderpath, fileName) {

    return this.http.delete(this.url + folderpath + fileName);

  }


}
