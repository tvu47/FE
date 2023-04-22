import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  private API_URL = 'http://localhost:8080';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public get(path: String): Observable<any> {
    const url = this.API_URL + '/' + path;
    return this.httpClient.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public post(path: String, object: any): Observable<any> {
    const url = this.API_URL + '/' + path;
    return this.httpClient.post<any>(url, object, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public getWithToken(path: String, token: any): Observable<any> {
    const url = this.API_URL + '/' + path;
    return this.httpClient.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      observe: 'response',
    });
  }

  public postWithToken(path: String, token: any, object: any): Observable<any> {
    const url = this.API_URL + '/' + path;
    return this.httpClient.post<any>(url, object, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
