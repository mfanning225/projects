import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProjectFormDetsService {

  constructor(private firebase: AngularFireDatabase,
    private datePipe: DatePipe) { }

  projectList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    userAcct: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl(''),
    requirements: new FormControl(''),
    status: new FormControl(''),
    targetDueDate: new FormControl('', Validators.required),
  });

  initalizeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      userAcct: 0,
      email: '',
      phone: '',
      requirements: '',
      status: 0,
      targetDueDate: '',
    });
  }

  getProject() {
    this.projectList = this.firebase.list('projects');
    return this.projectList.snapshotChanges();
  }

  insertProject(projects) {
    this.projectList.push({
      fullName: projects.fullName,
      email: projects.email,
      userAcct: projects.userAcct,
      phone: projects.phone,
      requirements: projects.requirements,
      status: projects.status,
      targetDueDate: this.datePipe.transform(projects.targetDueDate, 'yyyy-MM-dd'),
    });
  }

  updateProject(projects) {
    this.projectList.update(projects.$key,
    {
      fullName: projects.fullName,
      userAcct: projects.userAcct,
      email: projects.email,
      phone: projects.phone,
      requirements: projects.requirements,
      status: projects.status,
      targetDueDate: this.datePipe.transform(projects.targetDueDate, 'yyyy-MM-dd'),
    });
  }

deleteProject($key: string) {
  this.projectList.remove($key);
}

populateForm(prospect) {
  this.form.setValue(_.omit(prospect,'statusName', 'userAccount'));
}

}
