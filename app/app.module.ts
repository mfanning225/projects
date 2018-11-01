import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {FlexLayoutModule} from '@angular/flex-layout';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {AngularFirestoreModule} from 'angularfire2/firestore'

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ServicesComponent } from './services/services.component';
import { WebsiteDevComponent } from './services/website-dev/website-dev.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavListComponent } from './navigation/side-nav-list/side-nav-list.component';
import { AppDevComponent } from './services/app-dev/app-dev.component';
import { AuthService } from './auth/auth.service';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { ProspectsComponent } from './admin/prospects/prospects.component';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { UserService } from './shared/user.service';
import { AdminAuthGuardService } from './shared/admin-auth-guard.service';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProspectsService} from './shared/prospects.service';
import { DatePipe } from '@angular/common';
import { ProsLocationService } from './shared/pros-location.service';
import { PubContactUsComponent } from './pub-contact-us/pub-contact-us.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ProjectFormComponent } from './admin/project-form/project-form.component';
import { ProjectFormDetsService } from './shared/project-form-dets.service';
import { UserAccountsService } from './shared/user-accounts.service';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ServicesComponent,
    WebsiteDevComponent,
    WelcomeComponent,
    ContactUsComponent,
    HeaderComponent,
    SideNavListComponent,
    AppDevComponent,
    MyProjectsComponent,
    ProspectsComponent,
    AdminProjectsComponent,
    PubContactUsComponent,
    MatConfirmDialogComponent,
    ProjectFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot()

  ],
  providers: [
    AuthService, 
    UIService, 
    UserService,
    AdminAuthGuardService,
    ProspectsService,
    ProsLocationService,
    ProjectFormDetsService,
    UserAccountsService,
    DatePipe
  ],
    bootstrap: [AppComponent],
    entryComponents:[ContactUsComponent, ProjectFormComponent, MatConfirmDialogComponent]
})
export class AppModule { }
