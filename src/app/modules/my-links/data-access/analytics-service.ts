import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Analytics} from '../../../core/models/analytics.model';
import {ApiResponse} from '../../../core/models/api-response.model';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private http = inject(HttpClient);

  getByLinkId(linkId: string): Observable<Analytics> {
    return this.http.get<ApiResponse<Analytics>>(`/api/my-links/${linkId}/analytics`).pipe(
      map(res => res.data)
    );
  }
}
