import { Component, OnInit } from '@angular/core';
import { ProjectFormDetsService } from '../../shared/project-form-dets.service';
import { UIService } from '../../shared/ui.service';
import { ProStatusService } from '../../shared/pro-status.service';
import { MatDialogRef } from '@angular/material';
import { UserAccountsService } from '../../shared/user-accounts.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  constructor(public projects: ProjectFormDetsService,
              public projectStatus: ProStatusService,
              public userAcct: UserAccountsService,
    private uiService: UIService,
    public dialogRef: MatDialogRef<ProjectFormComponent>

) { }

ngOnInit() {
  this.projects.getProject();
    }

onClear() {
  this.projects.form.reset();
  this.projects.initalizeFormGroup();
}

onSubmit() {
  if (this.projects.form.valid) {
    if (!this.projects.form.get('$key').value)
    this.projects.insertProject(this.projects.form.value);
    else
    this.projects.updateProject(this.projects.form.value);
    this.projects.form.reset();
    this.projects.initalizeFormGroup();
    this.uiService.success('Submittd Successfully!')
    this.onClose();
  }
}

onClose() {
  this.projects.form.reset();
  this.projects.initalizeFormGroup();
  this.dialogRef.close();
}


}
