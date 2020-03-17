import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { service } from '../Interfaces/service.Interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  constructor(private db: AngularFireDatabase) { }
  add(service) {
    this.db.list('/services').push(service);
  }



  getAll(): Observable<service[]> {
    return this.db.list<service>('/services')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as service;
            const id = c.payload.key;
            return { id, ...data };
          })
        )
      );
  }


  getByID(serviceID: string) {
    return this.db.object('/services/' + serviceID).valueChanges();
  }


  update(serviceID: string, service) {
    return this.db.object('/services/' + serviceID).update(service);

  }

  Delete(serviceID: string) {
    return this.db.object('/services/' + serviceID).remove();

  }
}
