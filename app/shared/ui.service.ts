import {Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class UIService {
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar) {}

    showSnackBar(message, action, duration) {
        this.snackbar.open(message, action, {
            duration: duration
        });
    }

    config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
    }

    success(msg) {
        this.config['panelClass'] = ['notification', 'success'];
        this.snackbar.open(msg, '', this.config);
    }

    warn(msg){
        this.config['panelClass'] = ['notification', 'warn'];
        this.snackbar.open(msg, '', this.config);
      }
}