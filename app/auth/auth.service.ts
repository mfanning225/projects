import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AngularFireAuth} from 'angularfire2/auth';

import { AuthData } from "./auth-data.module";
import { UIService } from '../shared/ui.service';
import { UserService } from '../shared/user.service';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { AppUser } from '../models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;
    user$: Observable<firebase.User>;

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth,
        private uiService: UIService,
        private affAuth: AngularFireAuth,
        private route: ActivatedRoute,
        private userService: UserService
    ) {
        this.user$ = afAuth.authState; 

    }


    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                // this.router.navigate(['/my-projects']);
            } else {
                this.authChange.next(false);
                this.router.navigate(['/']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
        .createUserWithEmailAndPassword(authData.email,authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
        .signInWithEmailAndPassword(authData.email,authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    loginG() {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/my-projects';
        localStorage.setItem('returnUrl', returnUrl);
        this.affAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      }
    
    onLogout() {
        this.afAuth.auth.signOut();
      }


    isAuth() {
        return this.isAuthenticated;
    }

    get appUser$() : Observable<AppUser> {
        return this.user$
        .switchMap(user => {
          if (user) return this.userService.get(user.uid);
    
          return Observable.of(null);
        });
      }
    }