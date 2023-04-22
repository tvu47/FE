import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss']
})
export class CategoryProductComponent implements OnInit {


  constructor(private httpService: HttpServiceService, private activatedRoute: ActivatedRoute) { }

  public listProductCategory: any;
  public category: any;
  public categoryId: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.categoryId = params.get("id");
    });
    this.getCategory();
    this.getProductsByCategory();
  }

  private getCategory() {
    this.httpService.get("api/v1/category/" + this.categoryId).subscribe(data=>{
      this.category = data;
    });
  }

  public getProductsByCategory() {
    this.httpService.post("api/v1/products/search", {
      "categoryId": [this.categoryId]
    }).subscribe(data => {
      this.listProductCategory = data;
      console.log(this.listProductCategory);
    });
  }

}
