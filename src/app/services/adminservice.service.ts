import { Injectable } from '@angular/core';
import { AdminInfo } from '../model/admin-info.model';

@Injectable({
  providedIn: 'root',
})
export class AdminserviceService {
  public adminInfo: any = null;

  constructor() {
    this.getAdminInfo();
  }

  private getAdminInfo() {
    let info = localStorage.getItem('admin');
    if (!info) {
      return;
    }
    this.adminInfo = JSON.parse(info);
    if (this.isTokenExpired(this.adminInfo.token)) {
      this.deleteAdminInfo();
    }
  }

  private isTokenExpired(token: string) {
    if(token == null){
      return true;
    }
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return expiry * 1000 < Date.now();
  }

  public isLogined(): boolean {
    if (this.adminInfo != null) {
      if (this.isTokenExpired(this.adminInfo.token)) {
        this.deleteAdminInfo();
      }
    }
    return this.adminInfo != null;
  }

  public setAdminInfo(data: any) {
    let adminInfo = new AdminInfo(data.username, data.token, data.roles);
    this.adminInfo = adminInfo;
    localStorage.setItem('admin', JSON.stringify(adminInfo));
  }

  public deleteAdminInfo() {
    this.adminInfo = false;
    localStorage.removeItem('admin');
  }

  public getToken(): any {
    if (this.adminInfo) {
      return this.adminInfo.token;
    }
    return null;
  }
}
