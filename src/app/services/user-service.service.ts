import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

export interface User {
  id: number;
  email: string;
  access: any;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private url = 'http://127.0.0.1:8000/api';
  user: any;
  userAdmin = false;
  userUsual = false;
  constructor(private http: HttpClient, private router: Router) { }
  registerUser(user: any, kindForm: boolean): void {
    let url = this.url + '/user';
    if (!kindForm) {
      url += '/check';
    }
    this.http.post<User[]>(url, {
      ...user
    }).subscribe((data) => {
        if (data[0].access !== null) {
          this.userAdmin = true;
        } else {
          this.userUsual = true;
        }
        this.user =  {...data[0]};
      this.router.navigate(['/']);
    }, () => {
      alert('error');
    });
  }
}
