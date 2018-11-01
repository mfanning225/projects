import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { WebsiteDevComponent } from './services/website-dev/website-dev.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServicesComponent } from './services/services.component';
import { AppDevComponent } from './services/app-dev/app-dev.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { ProspectsComponent } from './admin/prospects/prospects.component';
import { AdminAuthGuardService } from './shared/admin-auth-guard.service';
import { PubContactUsComponent } from './pub-contact-us/pub-contact-us.component';
import { ProjectFormComponent } from './admin/project-form/project-form.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    
    { path: 'services', component: ServicesComponent},
    {path: 'contact', component: PubContactUsComponent},

    { path: 'website-development', component: WebsiteDevComponent},
    { path: 'app-development', component: AppDevComponent},

     // Auth Protected Routes

     { path: 'my-projects', component: MyProjectsComponent, canActivate: [AuthGuard]},

    // Admin Routes

    {path: 'admin/admin-projects', component: AdminProjectsComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
    {path: 'admin/prospects', component: ProspectsComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
    { path: 'contact-us', component: ContactUsComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
    { path: 'admin/project-form', component: ProjectFormComponent, canActivate: [AuthGuard, AdminAuthGuardService]},


];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}