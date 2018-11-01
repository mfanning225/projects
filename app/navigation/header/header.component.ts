import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';


import { Observable } from 'rxjs';
import { AppUser } from '../../models/app-user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
 @Output() sidenavToggle = new EventEmitter<void>();
 isAuth: boolean;
 authSubscription: Subscription;
 user$: Observable<firebase.User>;
 appUser: AppUser;

  constructor(public authService: AuthService) {
    authService.appUser$.subscribe(appUser => this.appUser = appUser);
}

  
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
