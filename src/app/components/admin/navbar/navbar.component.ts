import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/client/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  private onLogout(): void {
    this.loginService.onLogout().subscribe({
      next: (v) => {
        localStorage.removeItem('admin');
        console.log('logout successfully ... , ', v);
      },
      error: (e) => {
        console.log('logout false, ', e);
      },
    });
  }
  public confirmThat() {
    Swal.fire({
      title: 'Do you want to logout ?',
      showCancelButton: true,
      confirmButtonText: 'Logout',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('logout!', '', 'success');
        this.onLogout();
        this.router.navigate(['/admin/login']);
      }
    });
  }
}
