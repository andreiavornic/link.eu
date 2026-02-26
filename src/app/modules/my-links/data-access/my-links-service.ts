import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Link} from '../../../core/models/link.model';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../../core/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class MyLinksService {
  private http = inject(HttpClient);

  getAll(): Observable<Link[]> {
    return this.http.get<ApiResponse<Link[]>>('/api/links').pipe(
      map(res => res.data)
    );
  }
}
