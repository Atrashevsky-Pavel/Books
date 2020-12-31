import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Likes {
  id: number;
  user_id: number;
  book_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class LikesServiceService {
  private url = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}
  getLikes(id: number): Observable<Likes[]> {
    return this.http.post<Likes[]>(this.url + '/likes/get', {
      id
    });
  }
  createLike(likeCreate: any): Observable<object> {
    return this.http.post(this.url + '/likes', likeCreate);
  }
  deleteLike(id: number): Observable<object> {
    return  this.http.post(this.url + '/likes/delete', {
      id
    });
  }
}
