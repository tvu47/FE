import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-search-product-name',
  templateUrl: './search-product-name.component.html',
  styleUrls: ['./search-product-name.component.scss']
})
export class SearchProductNameComponent implements OnInit {

 
  constructor(private httpService: HttpServiceService, private activatedRoute: ActivatedRoute) { }

  public listProductName: any;
  public productName: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.productName = params.get("name");
    });
    this.searchProductByName();
  }

  public searchProductByName() {
    this.httpService.post("api/v1/products/search", {
      "name": [this.productName]
    }).subscribe(data => {
      this.listProductName = data;
      console.log(this.listProductName);
    });
  }
}
