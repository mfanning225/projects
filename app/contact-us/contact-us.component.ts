import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

import { ProspectsService } from '../shared/prospects.service';
import {ProsLocationService} from '../shared/pros-location.service';
import {UIService} from '../shared/ui.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit  {
  

  constructor(public prospects: ProspectsService,
            public prosLocationService: ProsLocationService,
            private uiService: UIService,
            public dialogRef: MatDialogRef<ContactUsComponent>
  ) { }


  location = [
    {id: 3, value: 'Location 1'},
    {id: 2, value: 'Location 2'},
    {id: 2, value: 'Location 3'}
  ];

  ngOnInit() {
this.prospects.getProspects();
  }

  onClear() {
    this.prospects.form.reset();
    this.prospects.initalizeFormGroup();
  }

  onSubmit() {
    if (this.prospects.form.valid) {
      if (!this.prospects.form.get('$key').value)
      this.prospects.insertProspect(this.prospects.form.value);
      else
      this.prospects.updateProspect(this.prospects.form.value);
      this.prospects.form.reset();
      this.prospects.initalizeFormGroup();
      this.uiService.success('Submittd Successfully!')
      this.onClose();
    }
  }

  onClose() {
    this.prospects.form.reset();
    this.prospects.initalizeFormGroup();
    this.dialogRef.close();
  }


}