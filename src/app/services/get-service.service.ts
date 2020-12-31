import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Book {
  id: number;
  name: string;
  author: string;
  genre: string;
  year: number;
  download_link: string;
  buy_link: string;
  text: string;
  img: number;
  like?: boolean;
  likeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class GetServiceService {
  private url = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient) { }
  getBooks(): Observable<Book[]> {
    return  this.http.get<Book[]>(this.url + 'book');
  }
  putBook(book: any): Observable<object> {
    return  this.http.put(this.url + 'book', book);
  }
  createBook(book: any): Observable<object> {
    return  this.http.post(this.url + 'book', book);
  }
  deleteBook(id: number): Observable<object> {
    return  this.http.post(this.url + '/book/delete', {
      id
    });
  }
}
