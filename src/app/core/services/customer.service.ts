import { BaseModel } from './../models/base-model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { environment } from 'src/environments/environment';
import { FirebaseAbstract } from './firebase.abstract';

@Injectable({
  providedIn: 'root'
})
export class ObjectService extends FirebaseAbstract<BaseModel> {
  constructor(protected db: AngularFirestore) {
    super(db, `object`);
  }

 
}
