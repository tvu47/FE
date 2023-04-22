import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private httpService: HttpServiceService, private activatedRoute: ActivatedRoute, private cartService: CartService,
    private router: Router) { }

  private id: any;
  public product: any;
  public colorOptions: any;
  public indexColor: any = 0;
  public indexSize: any = 0;

  public limitQuantity: any;


  public quantity: number = 1;

  public listSameProduct: any;

  public listImageUrl: any = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get("id");
    });

    this.httpService.get("api/v1/inventory/" + this.id).subscribe(data => {
      this.product = data.products;
      this.colorOptions = data.colorOptions;
      
      this.imageUrlChoose = this.colorOptions[0].sizeOptions[0].imageUrl;

      for(let i = 0; i < this.chooseColor.length; i++){
        this.listImageUrl.push(this.colorOptions[i].sizeOptions[0].imageUrl);
      }
      console.log("list image", this.listImageUrl);

      console.log("data: (data)", data);
      this.httpService.post("api/v1/products/same-product-category", { "productId": this.product.id, "categoryId":this.product.category.id}).subscribe(data => {
        console.log("same cate: ", data);
        this.listSameProduct = data;
      });
    });

  }

  public addCart(product: any) {
    this.cartService.addCart(product, this.quantity, this.colorOptions[this.indexColor].colors,
      this.colorOptions[this.indexColor].sizeOptions[this.indexSize].size, this.colorOptions[this.indexColor].sizeOptions[this.indexSize].price,
      this.getLimitQuantity());
    this.router.navigate(['/cart']);
  }

  public validateQuantity() {
    if (this.quantity == null || this.quantity <= 0) {
      this.quantity = 1;
    }
    if (this.quantity > this.getLimitQuantity()) {
      this.quantity = this.getLimitQuantity();
    }
  }

  public getLimitQuantity() {
    return this.colorOptions[this.indexColor].sizeOptions[this.indexSize].quantity;
  }

  public getPrice() {
    return this.colorOptions[this.indexColor].sizeOptions[this.indexSize].price;
  }

  public imageUrlChoose: any;

  public chooseColor(index: any, color: any) {
    this.indexColor = index;
    this.indexSize = 0;
    this.quantity = 1;
    this.imageUrlChoose = color.sizeOptions[0].imageUrl;
    console.log("choose color", this.imageUrlChoose);
  }

  public chooseSize(index:any, size: any) {
    this.indexSize = index;
    this.quantity = 1;
    this.imageUrlChoose = size.imageUrl;
    console.log("choose size", this.imageUrlChoose);
  }

}
