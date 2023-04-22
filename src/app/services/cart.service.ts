import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItems: Product[] = [];

  constructor() {
    const dataCart = localStorage.getItem('cart');
    if (dataCart) {
      this.cartItems = JSON.parse(dataCart);
    }
  }

  public clearCart(){
    this.cartItems = [];
    localStorage.removeItem('cart');
  }

  public addCart(product: any, quantity: number, color:any, size:any, price: number, limitQLT: number) {
    product = new Product(product.id, product.productName, price, 1, color, size, limitQLT);

    const exist = this.cartItems.find((item) => {
      return item.id === product.id 
      && item.color.id === color.id 
      && item.size.id === size.id;
    });

    if (exist) {
      exist.quantity += quantity;
      exist.limitQuantity = limitQLT;
      if(exist.quantity > limitQLT){
        exist.quantity = limitQLT;
      }
      console.log(this.cartItems);
    } else {
      product.quantity = quantity;
      this.cartItems.push(product);
      console.log(this.cartItems);
    }
    this.saveCart();
  }

  public deleteCart(product: Product) {
    this.cartItems.forEach((item, index) => {
      if (item.id === product.id) {
        this.cartItems.splice(index, 1);
        return;
      }
    });
    this.saveCart();
  }

  public validateQuantity(product: Product) {
    if (product.quantity <= 0 || product.quantity == null) {
      product.quantity = 1;
    }
    if(product.quantity > product.limitQuantity){
      product.quantity = product.limitQuantity;
    }
    this.saveCart();
  }

  public saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
