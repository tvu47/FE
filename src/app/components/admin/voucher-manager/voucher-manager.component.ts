import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voucher-manager',
  templateUrl: './voucher-manager.component.html',
  styleUrls: ['./voucher-manager.component.scss']
})
export class VoucherManagerComponent implements OnInit {

  constructor(private httpService: HttpServiceService, private adminService: AdminserviceService, private router: Router, private formBuilder: FormBuilder) {
  }

  public currentPage: any = 1;
  public pageChange(event: any) {
    this.currentPage = event;
  }
  public formNewVoucher = this.formBuilder.group({
    code: ['', Validators.required,],
    value: ['', Validators.required],
    quantity: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required]
  });

  public voucherChoose: any;

  public formUpdateVoucher = this.formBuilder.group({
    id: ['', Validators.required],
    code: ['', Validators.required,],
    value: ['', [Validators.required, Validators.min(1)]],
    quantity: ['', [Validators.required, Validators.min(0)]],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required]
  });

  public chooseVoucher(voucher: any){
    this.voucherChoose = voucher;
  }

  public updateVoucher(){
    this.formUpdateVoucher.value.id = this.voucherChoose.id;
    console.log("update voucher", this.formUpdateVoucher.value);
    
    // const controls = this.formUpdateVoucher.controls;
    // for (const name in controls) {
    //   if(this.formUpdateVoucher.get(name)?.invalid){
    //     console.log(name);
    //   }
    // }

    if(this.formUpdateVoucher.invalid){
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: "Vui lòng nhập đầy đủ thông tin",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    this.httpService.postWithToken('api/v1/voucher/update', this.adminService.getToken(), this.formUpdateVoucher.value).subscribe(data => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Cập nhật thành công",
        showConfirmButton: false,
        timer: 1500
      });
      this.getAllVoucher();
    });
  }

  public vouchers: any = [];
  public billDetail: any;

  ngOnInit(): void {
    if (!this.adminService.isLogined()) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.getAllVoucher();
  }

  private getAllVoucher() {


    console.log("voucher token: " + this.adminService.getToken());
    this.httpService.getWithToken('api/v1/voucher/all', this.adminService.getToken()).subscribe(data => {
      this.vouchers = data.body;
      console.log("vouchers: ", this.vouchers);
    });
  }

  public addNewVoucher() {
    console.log(this.formNewVoucher.value);
    if (!this.formNewVoucher.valid) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Vui lòng nhập đầy đủ thông tin',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    };

    this.httpService.postWithToken('api/v1/voucher/add', this.adminService.getToken(), this.formNewVoucher.value).subscribe(data =>{
        console.log(data);
        this.vouchers.push(data.object);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.content,
          showConfirmButton: false,
          timer: 1500
        });
    });
  }


  public deleteVoucher(voucher: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Từ chối',
    }).then((result) => {
      localStorage.removeItem('customer_information');
      if (result.isConfirmed) {
        this.httpService.postWithToken("api/v1/voucher/" + voucher.id, this.adminService.getToken(), null).subscribe(data => {
          this.getAllVoucher();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.content,
            showConfirmButton: false,
            timer: 1500
          })
        });
      }
    });
  }
}
