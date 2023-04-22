import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  constructor(private httpService: HttpServiceService, private adminService: AdminserviceService, private router: Router) {
  }

  public tabChoose: any = 0;

  public bills: any = [];
  public billDetail: any;

  public currentPage: any = 1;

  public chooseTab(tab: any) {
    if (this.tabChoose == tab) {
      return;
    }
    this.tabChoose = tab;
    switch (this.tabChoose) {
      case 0:
        this.getAllBill();
        break;
      case 1:
        this.getAllBillByStatus(0);
        break;
      case 2:
        this.getAllBillByStatus(5);
        break;
      case 3:
        this.getAllBillByStatus(1);
        break;
      case 4:
        this.getAllBillByStatus(3);
        break;
      case 5:
        this.getAllBillByStatus(2);
        break;
    }
  }

  public pageChange(event: any){
    this.currentPage = event;
  }

  ngOnInit(): void {
    if (!this.adminService.isLogined()) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.getAllBill();
  }

  private getAllBill() {
    this.httpService.getWithToken('api/v1/bills', this.adminService.getToken()).subscribe(data => {
      this.bills = data.body;
      this.billDetail = this.bills[0];
      console.log(this.bills);
    });
  }

  private getAllBillByStatus(status: any) {
    this.httpService.getWithToken('api/v1/bills/status/' + status, this.adminService.getToken()).subscribe(data => {
      this.bills = data.body;
      this.billDetail = this.bills[0];
      console.log(this.bills);
    });
  }

  public getStringStatusBill(bill: any) {
    switch (bill.status) {
      case 0:
        return 'Chờ duyệt';
      case 1:
        return 'Đang giao';
      case 2:
        return 'Đã hủy';
      case 3:
        return 'Đã giao';
      case 4:
        return 'Đang đổi trả';
      case 5:
        return 'Đã duyệt';
      default:
        return 'zz';
    }
  }

  public getClassStatusBill(bill: any) {
    switch (bill.status) {
      case 0:
        return 'text-bg-light';
      case 1:
        return 'text-bg-warning';
      case 2:
        return 'text-bg-danger';
      case 3:
        return 'text-bg-success';
      case 4:
        return 'text-bg-secondary';
      case 5:
        return 'text-bg-info';
      default:
        return 'zz';
    }
  }

  public getTotalPrice(bill: any) {
    let price = 0;
    for (let i = 0; i < bill.details.length; i++) {
      price += (bill.details[i].cost * bill.details[i].quantity);
    }
    price -= bill.discount;
    return price;
  }

  public showDetail(bill: any) {
    this.billDetail = bill;
  }

  public acceptBill(bill: any) {
    this.httpService.postWithToken("api/v1/bills/accept/" + bill.id, this.adminService.getToken(), null).subscribe(data => {
      if (data.code == 200) {
        bill.status = data.object.status;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.content,
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  public deliverBill(bill: any) {
    this.httpService.postWithToken("api/v1/bills/deliver/" + bill.id, this.adminService.getToken(), null).subscribe(data => {
      if (data.code == 200) {
        bill.status = data.object.status;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.content,
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  public cancelBill(bill: any) {
    this.httpService.postWithToken("api/v1/bills/cancel/" + bill.id, this.adminService.getToken(), null).subscribe(data => {
      if (data.code == 200) {
        bill.status = data.object.status;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.content,
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  public deliveredBill(bill: any) {

    this.httpService.postWithToken("api/v1/bills/delivered/" + bill.id, this.adminService.getToken(), null).subscribe(data => {
      if (data.code == 200) {
        bill.status = data.object.status;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.content,
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  public deleteProductInBill(billId: any, productId: any, colorId: any, sizeId: any) {
    let dataPost = {
      "billId": billId,
      "productId": productId,
      "colorId": colorId,
      "sizeId": sizeId
    };
    this.httpService.postWithToken("api/v1/bills/delete-product-in-bill", this.adminService.getToken(), dataPost).subscribe(data => {
      if (data.code == 200) {
        console.log(data);
        console.log(this.billDetail);
        for (let i = 0; i < this.billDetail.details.length; i++) {
          let detail = this.billDetail.details[i];
          if (detail.billId == billId && detail.productId == productId && detail.color == colorId && detail.size == sizeId) {
            this.billDetail.details.splice(i, 1);
            break;
          }
        }
        if (this.billDetail.details.length == 0) {
          this.billDetail.status = 2;
        }
      }
    });
  }

}
