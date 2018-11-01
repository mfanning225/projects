import { Component, ViewChild, OnInit } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { UIService } from '../../shared/ui.service';
import { DialogService } from '../../shared/dialog.service';
import { ProjectFormDetsService } from '../../shared/project-form-dets.service';
import { ProStatusService } from '../../shared/pro-status.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { UserAccountsService } from '../../shared/user-accounts.service';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements OnInit {


  constructor(private projects: ProjectFormDetsService,
    private projectStatus: ProStatusService,
    private userAcct: UserAccountsService,
    private dialog: MatDialog,
    private uiService: UIService,
    private dialogService: DialogService
) { }

listProData: MatTableDataSource<any>;
displayedColumns: string[] = ['fullName', 'userAccount', 'email', 'phone','requirements', 'targetDueDate', 'statusName', 'actions'];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
searchKey: string;

ngOnInit() {
this.projects.getProject().subscribe(
list => {
let array = list.map(item => {
let statusName = this.projectStatus.getStatusName(item.payload.val()['status']);
let userAccount = this.userAcct.getUsersName(item.payload.val()['userAcct']);
return {
  $key: item.key,
  statusName,
  userAccount,
  ...item.payload.val()
};
});
this.listProData = new MatTableDataSource(array);
this.listProData.sort = this.sort;
this.listProData.paginator = this.paginator;  
});
}

onSearchClear() {
this.searchKey = "";
this.applyFilter();
}

applyFilter() {
this.listProData.filter = this.searchKey.trim().toLowerCase();
}

onCreate() {
this.projects.initalizeFormGroup();
const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.width = "60%";
dialogConfig.height = "90%";
this.dialog.open(ProjectFormComponent, dialogConfig);
}

onEdit(row) {
this.projects.populateForm(row);
const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.width = "60%";
dialogConfig.height = "90%";
this.dialog.open(ProjectFormComponent, dialogConfig);
}

onDelete($key) {
//   if(confirm('Are you sure you want to delete?')){
//     this.prospects.deleteProspect($key);
//     this.uiService.warn('Deleted Successfully!')
//   }

this.dialogService.openConfirmDialog('Are you sure you want to delete this record?')
.afterClosed().subscribe(res => {
if (res) {
this.projects.deleteProject($key);
this.uiService.warn('Deleted Successfully!');
}
});
}
}



