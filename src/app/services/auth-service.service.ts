import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';


// const cpUser = firebase.auth().currentUser;


@Injectable()


export class AuthService {


   cpUser = firebase.auth().currentUser;

  user$: Observable<firebase.User> ;
  redirectUrl: string;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private route: ActivatedRoute) {
    this.user$ =  afAuth.authState;

  }


  async getAllUsers() {
this.db.list('/users/').snapshotChanges();
  }


async changePass(value) {

 return new Promise<any>((resolve, reject) => {
  const cardtio = firebase.auth.EmailAuthProvider.credential(value.email, value.password);
  this.cpUser.reauthenticateWithCredential(cardtio)
  .then(res => {
    resolve(res);
  }, err => reject(err));
});
}



 async login(value) {

    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });

    }
  logout() {
    this.afAuth.auth.signOut();

  }


 async rigster(value) {

    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }


 async save(user: firebase.User) {
this.db.object('/users/' + user.uid).update(
  {
    name : user.displayName,
    email : user.email
  }
);
  }

}
