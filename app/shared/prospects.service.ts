import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  constructor(private firebase: AngularFireDatabase,
    private datePipe: DatePipe) { }

  prospectList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    projectDesc: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    location: new FormControl('', Validators.required),
    projectDueDate: new FormControl('', Validators.required),
    budget: new FormControl(''),
  });

  initalizeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      phone: '',
      projectDesc: '',
      location: 0,
      projectDueDate: '',
      budget:'',
    });
  }

  getProspects() {
    this.prospectList = this.firebase.list('prospects');
    return this.prospectList.snapshotChanges();
  }

  insertProspect(prospect) {
    this.prospectList.push({
      fullName: prospect.fullName,
      email: prospect.email,
      phone: prospect.phone,
      projectDesc: prospect.projectDesc,
      location: prospect.location,
      projectDueDate: this.datePipe.transform(prospect.projectDueDate, 'yyyy-MM-dd'),
      budget:prospect.budget
    });
  }

  updateProspect(prospect) {
    this.prospectList.update(prospect.$key,
    {
      fullName: prospect.fullName,
      email: prospect.email,
      phone: prospect.phone,
      projectDesc: prospect.projectDesc,
      location: prospect.location,
      projectDueDate: this.datePipe.transform(prospect.projectDueDate, 'yyyy-MM-dd'),
      budget:prospect.budget
    });
  }

deleteProspect($key: string) {
  this.prospectList.remove($key);
}

populateForm(prospect) {
  this.form.setValue(_.omit(prospect,'locationName'));
}

}
