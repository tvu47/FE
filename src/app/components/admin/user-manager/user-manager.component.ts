import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  constructor(private httpService: HttpServiceService,
    private adminService: AdminserviceService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  public users: any;
  public userChoose: any;

  public currentPage: any = 1;
  public pageChange(event: any) {
    this.currentPage = event;
  }
  public formNewUser = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    gender: ['', Validators.required],
    address: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repassword: ['', [Validators.required, Validators.minLength(6)]],
    dateOfBirth: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });

  public formUser = this.formBuilder.group({
    id: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['', Validators.required],
    address: ['', Validators.required]
  });

  ngOnInit(): void {
    if (!this.adminService.isLogined()) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.getAllUser();
  }

  private getAllUser() {
    this.httpService.getWithToken('api/v1/customers', this.adminService.getToken()).subscribe(data => {
      this.users = data.body;
      console.log(this.users);
      this.userChoose = this.users[0];
    });
  }

  public chooseUser(user: any) {
    this.userChoose = user;
    this.formUser.value.id = this.userChoose.id + "";
    this.formUser.value.firstName = this.userChoose.firstName;
    this.formUser.value.lastName = this.userChoose.lastName;
    this.formUser.value.address = this.userChoose.address;
    this.formUser.value.phone = this.userChoose.phone;
    this.formUser.value.email = this.userChoose.email;
    this.formUser.value.gender = this.userChoose.gender;
    console.log("user choose", this.userChoose);
  }

  public update() {
    console.log(this.formUser.value)
    const controls = this.formUser.controls;
    for (const name in controls) {
      if(this.formUser.get(name)?.value === ""){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Vui lòng nhập đầy đủ thông tin',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }
    }

  }

  public submitNewUser(){
    console.log("new user", this.formNewUser.value);

    if(this.formNewUser.invalid){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Không thể thực hiện',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    };
    this.httpService.postWithToken('api/v1/customers/store', this.adminService.getToken(), this.formNewUser.value).subscribe(data => {
      let newUser = {
        "active" : true,
        "address": data.address,
        "createTime": data.createTime,
        "dateOfBirth": data.dateOfBirth,
        "email": data.email,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "gender": data.gender == 1 ? "Nữ" :"Nam",
        "id": data.id,
        "phone": data.phoneNumber
      };
      this.users.push(newUser);
    });
  }

}
