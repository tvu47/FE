import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../model/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService, private router:Router) { }

  cartItems:Product[] = [];
  name:any;

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
  }

  public show(){
    console.log(this.cartItems);
  }

  public totalPrice(){
    var total = 0;
    this.cartItems.forEach((item)=>{
      total += (item.price * item.quantity);
    });
    return total;
  }

  public validateQuantity(product:Product){
    this.cartService.validateQuantity(product);
  }

  public deleteCart(product:Product){
    this.cartService.deleteCart(product);
  }

  public pay(){
    if(this.cartItems.length == 0){
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Giỏ hàng trống',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.router.navigate(['/payment']);
  }

}
