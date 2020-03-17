import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { doctor } from '../Interfaces/doctor.Interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private db: AngularFireDatabase) { }
  add(doctor) {
    this.db.list('/doctors').push(doctor);
  }



  getAll(): Observable<doctor[]> {
    return this.db.list<doctor>('/doctors')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as doctor;
            const id = c.payload.key;
            return { id, ...data };
          })
        )
      );
  }


  getByID(doctorID: string) {
    return this.db.object('/doctors/' + doctorID).valueChanges();
  }


  update(doctorID: string, doctor) {
    return this.db.object('/doctors/' + doctorID).update(doctor);

  }

  Delete(doctorID: string) {
    return this.db.object('/doctors/' + doctorID).remove();

  }
}
