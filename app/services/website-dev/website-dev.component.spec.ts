import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteDevComponent } from './website-dev.component';

describe('WebsiteDevComponent', () => {
  let component: WebsiteDevComponent;
  let fixture: ComponentFixture<WebsiteDevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteDevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
