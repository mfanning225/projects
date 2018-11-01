import { Component, OnInit } from '@angular/core';
import { ProspectsService } from '../shared/prospects.service';
import {ProsLocationService} from '../shared/pros-location.service';
import {UIService} from '../shared/ui.service';

@Component({
  selector: 'app-pub-contact-us',
  templateUrl: './pub-contact-us.component.html',
  styleUrls: ['./pub-contact-us.component.css']
})
export class PubContactUsComponent implements OnInit {

  constructor(public prospects: ProspectsService,
    public prosLocationService: ProsLocationService,
    private uiService: UIService,
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
this.prospects.insertProspect(this.prospects.form.value);
this.prospects.form.reset();
this.prospects.initalizeFormGroup();
this.uiService.success('Submittd Successfully!')
}
}


}
