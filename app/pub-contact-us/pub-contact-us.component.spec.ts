import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubContactUsComponent } from './pub-contact-us.component';

describe('PubContactUsComponent', () => {
  let component: PubContactUsComponent;
  let fixture: ComponentFixture<PubContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
