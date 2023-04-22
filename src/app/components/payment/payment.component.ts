import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private route: Router,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentServiceService,
    private httpService: HttpServiceService) { }

  public formInfo = this.formBuilder.group({
    customerId: ['75', Validators.required],
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    address: ['', Validators.required]
  })

  public inputVoucher: string = "";

  public cartItems: Product[] = [];
  public name: any;
  public user: any;
  public vouchers: any;
  public voucher: any;

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    this.getUser();
    this.getVoucher();
    console.log("user: ", this.user);
  }

  private getUser() {
    let dataUser = localStorage.getItem("customer_information");
    console.log("datauser: ", dataUser);
    if (dataUser) {
      this.user = JSON.parse(dataUser);
      console.log("user: ", this.user);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Vui lòng đăng nhập để thanh toán',
        showConfirmButton: false,
        timer: 1500
      });
      this.route.navigate(['/login']);
      localStorage.setItem("last-url", "/payment");
    }
  }

  private getVoucher() {
    this.httpService.getWithToken("api/v1/voucher/available", this.user.token).subscribe(data => {
      console.log("vouchers: ", data.body);
      this.vouchers = data.body;
    });
  }

  public show() {
    console.log(this.cartItems);
  }

  public totalPrice() {
    var total = 0;
    this.cartItems.forEach((item) => {
      total += (item.price * item.quantity);
    });
    return total;
  }

  public finalTotalPrice(){
    if (this.voucher == null) {
      return this.totalPrice();
    } else {
      let price = this.totalPrice();
      price -= (price * this.voucher.value / 100);
      return price;
    }
  }

  public getDiscount() {
    if (this.voucher == null) {
      return "";
    } else {
      let price = this.totalPrice();
      price = (price * this.voucher.value / 100);
      return "-" + price + " VNĐ";
    }
  }

  public onSubmit() {
    if (this.formInfo.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Không thể thực hiện',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    this.formInfo.value.customerId = this.user.id;
    const data = {
      "voucher": this.voucher,
      "info": this.formInfo.value,
      "productsOrder": this.cartService.cartItems
    };
    this.paymentService.submitPayment(data);
  }

  public checkVoucher() {
    this.voucher = null;
    for (let i = 0; i < this.vouchers.length; i++) {
      if (this.vouchers[i].code == this.inputVoucher) {
        this.voucher = this.vouchers[i];
        break;
      }
    }
    console.log(this.voucher);
  }

}
