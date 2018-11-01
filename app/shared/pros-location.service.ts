import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class ProsLocationService {
  locationList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) { 
    this.locationList = this.firebase.list('locations');
    this.locationList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  getLocationName($key) {
    if ($key == "0")
    return "";
    else {
      return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
    }
  }
}
