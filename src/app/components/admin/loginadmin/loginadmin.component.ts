import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { LoginService } from 'src/app/services/client/login.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.scss']
})
export class LoginadminComponent implements OnInit {

  public formLogin = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpServiceService,
    private adminService: AdminserviceService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public onLogin() {
    if (this.formLogin.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Không thể thực hiện',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    this.loginService.onLoginAdmin(this.formLogin.value.username, this.formLogin.value.password).subscribe({
      next: (v) => {
        console.log('login succesfully, ', v);
        this.adminService.setAdminInfo(v);
        this.router.navigate(['admin/bill'])
      },
      error: (e) => {
        console.log('login error, ', e);
      },
    });
  }

  // public onLogin() {
  //   if (this.formLogin.invalid) {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'warning',
  //       title: 'Vui lòng nhập đầy đủ thông tin',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //     return;
  //   }
  //   console.log(this.formLogin.value);
  //   this.httpService.post("api/v1/admin/login", this.formLogin.value).subscribe(data => {
  //     this.adminService.setAdminInfo(data); 
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Đăng nhập thành công',
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //     this.router.navigate(['/admin/bill']);
  //   });
  // }

}
