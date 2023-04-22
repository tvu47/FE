import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerInfoRequest } from '../dto/request/CustomerInfoRequest';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = environment.urlBase;

  constructor(private http: HttpClient) {}

  public onChange(
    requestCustomerInfoChange: CustomerInfoRequest
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/customers`,
      requestCustomerInfoChange
    );
  }
  public onRegister(form: any): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        username: form.value.username,
        password: form.value.password,
        phone: form.value.phone,
        date: form.value.date,
      },
    });
    return this.http.post(`${this.baseUrl}/customers/register`, params);
  }
  public getHistory(s: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        status: s,
      },
    });
    return this.http.post(`${this.baseUrl}/customers/history`, params);
  }
}
