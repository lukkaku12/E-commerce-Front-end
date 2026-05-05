import { Component } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { LoadingStateService } from './services/loading-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent {
  loading$: Observable<boolean>;
  rotatingStatus$: Observable<string>;

  readonly statusMessages = [
    'Starting server… this may take about 1 minute.',
    'Warming up services and establishing secure connection.',
    'Almost there — thanks for your patience.'
  ];

  constructor(private loadingStateService: LoadingStateService) {
    this.loading$ = this.loadingStateService.loading$;
    this.rotatingStatus$ = this.loading$.pipe(
      switchMap((isLoading) => {
        if (!isLoading) {
          return of(this.statusMessages[0]);
        }

        return interval(4200).pipe(
          startWith(0),
          map((tick) => this.statusMessages[tick % this.statusMessages.length])
        );
      })
    );
  }
}
