import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements OnInit {
  user_information: any;
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  ngOnInit(): void {}

  public sessionIsExpire(key_storage: string, uri: string): any {
    const user_info = this.getUserInformationAndCheckNull(key_storage, uri);
    if (this.jwtHelper.isTokenExpired(user_info.token)) {
      this.getPronoun(
        'Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại..',
        uri
      );
      localStorage.removeItem(key_storage);
      return null;
    }
    return this.user_information;
  }

  public getUserInformationAndCheckNull(key_storage: string, uri: string): any {
    this.user_information = JSON.parse(localStorage.getItem(key_storage)!);
    if (this.user_information === null) {
      this.switchRoute(uri);
    }
    return this.user_information;
  }

  getPronoun(title_m: string, uri_login: string) {
    Swal.fire({
      title: title_m,
      confirmButtonText: 'OK',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // this.router.navigate(['login']);
        this.switchRoute(uri_login);
      }
    });
  }
  switchRoute(uri: string) {
    this.router.navigate([uri]);
  }
}
