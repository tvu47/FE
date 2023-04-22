import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private httpService: HttpServiceService) { }

  public listProducts: any;
  public listCategories: any;

  public listProductsBestSell: any;
  public listNewestProducts: any;

  public currentPage: any = 1;
  public pageChange(event: any) {
    this.currentPage = event;
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  private getProducts() {
    this.httpService.get("api/v1/products").subscribe(data => {
      this.listProducts = data;
      console.log(this.listProducts);
    });

    this.httpService.get("api/v1/products/best-sell-products").subscribe(data => {
      this.listProductsBestSell = data;
      console.log(this.listProductsBestSell);
    });

    this.httpService.get("api/v1/products/newest-products").subscribe(data => {
      this.listNewestProducts = data;
      console.log(this.listNewestProducts);
    });
  }

  private getCategories() {
    this.httpService.get("api/v1/category").subscribe(data => {
      this.listCategories = data;
    })
  }

  public getProductsByCategoryId(id: any) {
    this.httpService.post("api/v1/products/search", {
      "categoryId": [id]
    }).subscribe(data => {
      this.listProducts = data;
      console.log(this.listProducts);
    });
  }

}
