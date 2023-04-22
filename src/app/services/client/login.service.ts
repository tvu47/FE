import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestLogin } from 'src/app/dto/request/RequestLogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = environment.urlBase;

  constructor(private http: HttpClient) {}

  public onLogin(uu: any, pp: any): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        username: uu,
        password: pp,
      },
    });
    return this.http.post(`${this.baseUrl}/customers/login`, params);
  }

  public onLoginAdmin(uu: any, pp: any): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        username: uu,
        password: pp,
      },
    });
    return this.http.post(`${this.baseUrl}/admin/login`, params);
  }

  public onLogout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/logout`);
  }

  public logoutCustomer() {
    return this.http.get(`${this.baseUrl}/customers/logout`);
  }
}
