import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpServiceService } from './http-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  private baseUrl = environment.urlBase;
  constructor(
    private httpService: HttpServiceService,
    private http: HttpClient
  ) {}

  public getProducts(): any {
    this.httpService.get('api/v1/products').subscribe((data) => {
      return data;
    });
  }

  public importProducts(file: FileList): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let f: File = file[0];
    const formData = new FormData();
    formData.append('file', f);

    return this.http.post(`${this.baseUrl}/inventory/upload-data`, formData, {
      headers: headers,
    });
  }
}
