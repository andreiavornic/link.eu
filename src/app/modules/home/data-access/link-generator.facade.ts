import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenerateLinkRequest} from '../../../core/models/link-generation.model';
import {Link} from '../../../core/models/link.model';
import {ApiResponse} from '../../../core/models/api-response.model';
import {map, Observable} from 'rxjs';
import {LinkGenerator} from './link-generator';

@Injectable({
  providedIn: 'root',
})
export class LinkGeneratorFacade {
  private service: LinkGenerator = inject(LinkGenerator);

  private readonly _result = signal<Link | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly result = this._result.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly hasResult = computed(() => !!this._result());

  generate(originalUrl: string, email?: string): void {
    this._isLoading.set(true);
    this._error.set(null);

    this.service.generate({originalUrl, email}).subscribe({
      next: (link) => {
        this._result.set(link);
        this._isLoading.set(false);
      },
      error: (_) => {
        this._error.set("Something went wrong. Please try again.");
        this._isLoading.set(false);
      }
    });
  }

  reset() : void {
    this._result.set(null);
    this._error.set(null);
  }
}
