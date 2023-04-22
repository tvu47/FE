import { Component, OnInit } from '@angular/core';
import { ResponseLogin } from 'src/app/dto/response/ResponseLogin';
import { LoginService } from 'src/app/services/client/login.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public preFormLogin!: any;
  public loginInformationResponse!: ResponseLogin;
  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) { }


  public formLogin = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password: ['', Validators.required]
  });

  ngOnInit(): void { }

  public login(): void {
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
    console.log('form: {}', this.formLogin.value);
    localStorage.removeItem('customer_information');
    this.loginService.onLogin(this.formLogin.value.username, this.formLogin.value.password).subscribe({
      next: (v) => {
        console.log('login succesfully, ', JSON.stringify(v));
        localStorage.setItem('customer_information', JSON.stringify(v));
        let lastUrl = localStorage.getItem('last-url');
        if (lastUrl) {
          this.router.navigate([lastUrl]);
          localStorage.removeItem('last-url');
        } else {
          this.router.navigate(['/']);
        }
        console.log('login succesfully, ', v);
        // this.router.navigate(['user/account/profile'])
      },
      error: (e) => {
        console.log('login error, ', e);
      },
    });
  }
}
