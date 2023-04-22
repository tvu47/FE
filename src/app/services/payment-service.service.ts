import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from './cart.service';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private httpService: HttpServiceService, private router:Router, private cartService:CartService) { }

  public submitPayment(data: any)  {
    this.httpService.post('api/v1/payment', data).subscribe(data => {
      switch (data.code) {
        case 200:
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.content,
            showConfirmButton: false,
            timer: 1500
          });
          this.cartService.clearCart();
          this.router.navigate(['/']);
          break;
      }
    });
  }
}
