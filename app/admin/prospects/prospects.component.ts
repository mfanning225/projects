import { Component, OnInit, ViewChild } from '@angular/core';
import { ProspectsService } from '../../shared/prospects.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { ProsLocationService } from '../../shared/pros-location.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { ContactUsComponent } from '../../contact-us/contact-us.component';
import { UIService } from '../../shared/ui.service';
import { DialogService } from '../../shared/dialog.service';


@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
  styleUrls: ['./prospects.component.css']
})
export class ProspectsComponent implements OnInit {

  constructor(private prospects: ProspectsService,
              private prosLoc: ProsLocationService,
              private dialog: MatDialog,
              private uiService: UIService,
              private dialogService: DialogService
  ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'phone','projectDesc', 'projectDueDate', 'budget', 'locationName', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.prospects.getProspects().subscribe(
      list => {
      let array = list.map(item => {
        let locationName = this.prosLoc.getLocationName(item.payload.val()['location']);
          return {
            $key: item.key,
            locationName,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;  
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.prospects.initalizeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    this.dialog.open(ContactUsComponent, dialogConfig);
  }

  onEdit(row) {
    this.prospects.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    this.dialog.open(ContactUsComponent, dialogConfig);
  }

  onDelete($key) {
  //   if(confirm('Are you sure you want to delete?')){
  //     this.prospects.deleteProspect($key);
  //     this.uiService.warn('Deleted Successfully!')
  //   }

  this.dialogService.openConfirmDialog('Are you sure you want to delete this record?')
  .afterClosed().subscribe(res => {
    if (res) {
      this.prospects.deleteProspect($key);
      this.uiService.warn('Deleted Successfully!');
    }
  });
}
}


