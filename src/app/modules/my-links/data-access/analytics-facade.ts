import {inject, Injectable, signal} from '@angular/core';
import {AnalyticsService} from './analytics-service';
import {Analytics} from '../../../core/models/analytics.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsFacade {
  private service = inject(AnalyticsService);

  private readonly _data = signal<Analytics | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly data = this._data.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  load(linkId: string): void {
    this._isLoading.set(true);
    this._error.set(null);

    this.service.getByLinkId(linkId).subscribe({
      next: (analytics) => {
        this._data.set(analytics);
        this._isLoading.set(false);
      },
      error: () => {
        this._error.set('Failed to load analytics. Please try again.');
        this._isLoading.set(false);
      },
    });
  }

  refresh(linkId: string): void {
    this.load(linkId);
  }
}
