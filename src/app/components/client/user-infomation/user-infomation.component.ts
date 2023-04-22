import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionService } from 'src/app/services/client/session.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-infomation',
  templateUrl: './user-infomation.component.html',
  styleUrls: ['./user-infomation.component.scss'],
})
export class UserInfomationComponent implements OnInit, OnDestroy {
  user_information: any;
  pre_form!: NgForm;

  constructor(
    private session: SessionService,
    private customerService: CustomerService,
    private _location: Location
  ) {}
  ngOnDestroy(): void {
    console.log('----ng destroy----');
  }

  ngOnInit(): void {
    this._location.go("user/account/profile")
    this.getUserInformation();
  }

  getUserInformation() {
    this.user_information = this.session.sessionIsExpire("customer_information", "login");
    console.log('user: ' + JSON.stringify(this.user_information));
  }

  submit(form: NgForm) {
    this.saveUserInformation(form);
  }

  private saveUserInformation(form: NgForm) {
    console.log('saveUserInformation, ', form.value);
    let userInfo = JSON.parse(localStorage.getItem("customer_information")!);

    console.log("profile",userInfo);
    this.customerService.onChange(form.value).subscribe({
      next: (v) => {
        console.log('response save, ', v);
        
        userInfo.firstName = v.firstName;
        userInfo.lastName = v.lastName;
        userInfo.phone = v.phoneNumber;
        userInfo.gender = v.gender;
        userInfo.dateOfBirth = v.dateOfBirth;
        userInfo.address = v.address;
        localStorage.setItem("customer_information",JSON.stringify(userInfo));

      },
      error: (e) => {
        console.log('login error, ', e);
      },
    });
  }
}
