import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingStateService } from '../services/loading-state.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingStateService: LoadingStateService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingStateService.show();

    return next.handle(req).pipe(
      finalize(() => this.loadingStateService.hide())
    );
  }
}
