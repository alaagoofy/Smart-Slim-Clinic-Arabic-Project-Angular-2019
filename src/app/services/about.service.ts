import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { About } from '../Interfaces/About.Interface';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private db: AngularFireDatabase) { }


  getAll(): Observable<About[]> {
    return this.db.list<About>('/AboutUs')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as About;
            const id = c.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  getByID(id) {
    return this.db.object('/AboutUs/' + id).valueChanges();
  }

  update(id,about){
return this.db.object('/AboutUs/' + id).update(about);
  }
}
