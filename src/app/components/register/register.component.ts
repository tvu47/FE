import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private route: Router,
    private formBuilder: FormBuilder
  ) { }

  public formRegis = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repassword: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    date: ['', Validators.required]
  });

  ngOnInit(): void { }

  register() {
    if (this.formRegis.invalid || this.formRegis.value.password != this.formRegis.value.repassword) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Không thể thực hiện',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    this.customerService.onRegister(this.formRegis).subscribe({
      next: (v) => {
        console.log('success register: ' + v);
        Swal.fire({
          title: 'Register successfully, please login again...',
          confirmButtonText: 'Ok',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.route.navigate(['login']);
          }
        });
      },
      error: (e) => {
        console.log('error-register: ' + e);
        Swal.fire('register error');
      },
    });
  }
}
