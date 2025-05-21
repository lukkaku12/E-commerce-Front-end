import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notyf = new Notyf({
    duration: 5000,
    position: {
    x: 'right',
    y: 'top'
  },
    types: [
      {
        type: 'info',
        background: 'orange',
        icon: false
      }
    ]
  });

  notifyInfo(message: string) {
    this.notyf.open({ type: 'info', message: `⚠️ ${message}` });
  }

  notifyError(message: string) {
    this.notyf.error(message);
  }

  notifySuccess(message: string) {
    this.notyf.success(message);
  }
}