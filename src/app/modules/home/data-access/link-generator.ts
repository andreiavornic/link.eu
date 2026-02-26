import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenerateLinkRequest} from '../../../core/models/link-generation.model';
import {Link} from '../../../core/models/link.model';
import {ApiResponse} from '../../../core/models/api-response.model';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinkGenerator {
  private http: HttpClient = inject(HttpClient);

  generate(request: GenerateLinkRequest): Observable<Link> {
    return this.http.post<ApiResponse<{ link: Link }>>('/api/links', request)
      .pipe(
        map(res => res.data.link)
      );
  }
}
