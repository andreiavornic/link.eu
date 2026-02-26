import {inject, Injectable, signal} from '@angular/core';
import {MyLinksService} from './my-links-service';
import {Link} from '../../../core/models/link.model';

@Injectable({
  providedIn: 'root',
})
export class MyLinksFacade {

  private service = inject(MyLinksService);

  private readonly _links = signal<Link[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly links = this._links.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    this._isLoading.set(true);
    this._error.set(null);

    this.service.getAll().subscribe({
      next: (links) => {
        this._links.set(links);
        this._isLoading.set(false);
      },
      error: () => {
        this._error.set('Failed to load links. Please try again.');
        this._isLoading.set(false);
      },
    });
  }

  refresh(): void {
    this.load();
  }
}
