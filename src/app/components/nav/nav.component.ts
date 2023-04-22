import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/client/login.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import Swal from 'sweetalert2';
import { SearchProductNameComponent } from '../search-product-name/search-product-name.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private httpService: HttpServiceService,
    public cartService: CartService
  ) {}

  public user: any;
  public listCategories: any;
  public searchProductName: any;

  ngOnInit(): void {
    this.getUser();
    this.getCategories();
  }

  private getCategories() {
    this.httpService.get('api/v1/category').subscribe((data) => {
      this.listCategories = data;
    });
  }

  private getUser() {
    let dataUser = localStorage.getItem('customer_information');
    // console.log("datauser: ", dataUser);
    if (dataUser) {
      this.user = JSON.parse(dataUser);
      if (this.isTokenExpired(this.user.token)) {
        this.user = null;
        this.loginService.logoutCustomer();
      }
      console.log('user: ', this.user);
    }
  }

  public logout() {
    Swal.fire({
      title: 'Bạn có muốn đăng xuất không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Từ chối',
    }).then((result) => {
      localStorage.removeItem('customer_information');
      if (result.isConfirmed) {
        this.user = null;
        this.loginService.logoutCustomer().subscribe({
          next: (v) => {
            console.log('logout success...{}', v);
            this.router.navigate(['login']);
          },
          error: (e) => {
            console.log('logout fail...{}', e);
          },
        });
      }
    });
  }

  private isTokenExpired(token: string) {
    if (token == null) {
      return true;
    }
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return expiry * 1000 < Date.now();
  }

  public onSearchProductName() {
    console.log(this.searchProductName);
    this.router.navigate(['/product-name/' + this.searchProductName]);
    // this.spn.searchProductByName();
  }
}
