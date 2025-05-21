import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private firstRequestDone = false;

  constructor(private notificationService: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.firstRequestDone) {
      this.firstRequestDone = true;
      this.notificationService.notifyInfo(
        'Conectando con el servidor, por favor espera...'
      );
    }

    return next.handle(req).pipe(
      tap({
        // puedes agregar más lógica aquí si quieres ocultar loaders después
      })
    );
  }
}