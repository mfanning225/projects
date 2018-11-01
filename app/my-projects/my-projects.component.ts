import { Component, ViewChild, OnInit } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { ProStatusService } from '../shared/pro-status.service';
import { UserAccountsService } from '..//shared/user-accounts.service';
import { MyProjectsService } from '../shared/my-projects.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {


  constructor(private myprojects: MyProjectsService,
    private projectStatus: ProStatusService,
    private userAcct: UserAccountsService,
) { }

listProData: MatTableDataSource<any>;
displayedColumns: string[] = ['fullName', 'userAccount','phone','requirements', 'targetDueDate', 'statusName'];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
searchKey: string;
userId: string;

ngOnInit() {
this.myprojects.getProject().subscribe(
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

// onCreate() {
// this.projects.initalizeFormGroup();
// const dialogConfig = new MatDialogConfig();
// dialogConfig.disableClose = true;
// dialogConfig.autoFocus = true;
// dialogConfig.width = "60%";
// dialogConfig.height = "90%";
// this.dialog.open(ProjectFormComponent, dialogConfig);
// }

// onEdit(row) {
// this.projects.populateForm(row);
// const dialogConfig = new MatDialogConfig();
// dialogConfig.disableClose = true;
// dialogConfig.autoFocus = true;
// dialogConfig.width = "60%";
// dialogConfig.height = "90%";
// this.dialog.open(ProjectFormComponent, dialogConfig);
// }

// onDelete($key) {


// this.dialogService.openConfirmDialog('Are you sure you want to delete this record?')
// .afterClosed().subscribe(res => {
// if (res) {
// this.projects.deleteProject($key);
// this.uiService.warn('Deleted Successfully!');
// }
// });
// }


}