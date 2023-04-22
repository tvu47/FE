import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss'],
})
export class ProductManagerComponent implements OnInit {
  public currentPage: any = 1;
  public pageChange(event: any) {
    this.currentPage = event;
  }

  constructor(
    private httpService: HttpServiceService,
    private adminService: AdminserviceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductServiceService
  ) { }

  public formNewProduct = this.formBuilder.group({
    name: ['', Validators.required],
    content: ['', Validators.required],
    category: ['', Validators.required],
    material: ['', Validators.required],
    manufactory: ['', Validators.required]
  });

  public formNewInventory = this.formBuilder.group({
    productId: ['', Validators.required],
    color: ['', Validators.required],
    size: ['', [Validators.required, Validators.min(35), Validators.max(45)]],
    quantity: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.min(1)]],
    image: ['', [Validators.required]]
  });

  public products: any = [];
  public productDetail: any;

  public categories: any;
  public materials: any;

  ngOnInit(): void {
    if (!this.adminService.isLogined()) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.getCategories();
    this.getMaterials();
    this.getProducts();
  }

  private getProducts() {
    this.httpService
      .getWithToken('api/v1/products/all', this.adminService.getToken())
      .subscribe((data) => {
        this.products = data.body;
        this.productDetail = this.products[0];
        console.log(this.products);
      });
  }

  private getCategories() {
    this.httpService
      .getWithToken('api/v1/category', this.adminService.getToken())
      .subscribe((data) => {
        this.categories = data.body;
        console.log(this.categories);
      });
  }

  private getMaterials() {
    this.httpService
      .getWithToken('api/v1/materials', this.adminService.getToken())
      .subscribe((data) => {
        this.materials = data.body;
        console.log(this.materials);
      });
  }

  public chooseProduct(product: any) {
    this.productDetail = product;
    this.formNewInventory.value.productId = product.id;
    console.log(this.productDetail);
  }

  public detailProduct(productId: any) {
    console.log('detail product id ' + productId);
  }

  public addNewInventory() {
    this.formNewInventory.value.productId = this.productDetail.id;
    console.log(this.formNewInventory.value);
    // if (this.formNewInventory.invalid) {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'warning',
    //     title: 'Không thể thực hiện',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   return;
    // }
    this.httpService
      .postWithToken(
        'api/v1/inventory/store',
        this.adminService.getToken(),
        this.formNewInventory.value
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  public addNewProduct() {
    console.log(this.formNewProduct.value);
    if (this.formNewProduct.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Vui lòng nhập đầy đủ thông tin',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    let dataBody = {
      productName: this.formNewProduct.value.name,
      content: this.formNewProduct.value.content,
      categoryId: this.formNewProduct.value.category,
      materialId: this.formNewProduct.value.material,
      manufactureAddress: this.formNewProduct.value.manufactory,
      status: true,
    };

    this.httpService
      .postWithToken('api/v1/products', this.adminService.getToken(), dataBody)
      .subscribe((data) => {
        if (data.code == 200) {
          this.getProducts();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.content,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  private fileExcelImport: any;

  public importExcel() {
    if (this.fileExcelImport == null) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Vui lòng chọn file cần import',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileExcelImport);

    this.httpService
      .postWithToken(
        'api/v1/products/import',
        this.adminService.getToken(),
        formData
      )
      .subscribe((data) => {
        if (data.code == 200) {
          this.getProducts();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  public chooseFile(event: any) {
    let file = event.target.files[0];
    this.fileExcelImport = file;
  }

  upload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(files);
    this.productService.importProducts(files).subscribe({
      next: (v) => {
        console.log('import success {}', v);
      },
      error: (e) => {
        console.log('import false {}', e);
      },
    });
  }

  public productUpdate: any;

  public chooseProductUpdate(product: any) {
    this.productUpdate = product;
    this.formUpdateProduct.value.id = product.id;
    this.formUpdateProduct.value.name = product.name;
    this.formUpdateProduct.value.content = product.content;
    this.formUpdateProduct.value.category = product.category;
    this.formUpdateProduct.value.material = product.material;
    this.formUpdateProduct.value.manufactory = product.manufactory;
    console.log("choose product update", product);
  }

  public formUpdateProduct = this.formBuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    content: ['', Validators.required],
    category: ['', Validators.required],
    material: ['', Validators.required],
    manufactory: ['', Validators.required]
  });

  public updateProduct() {
    this.formUpdateProduct.value.id = this.productUpdate.id;
    console.log(this.formUpdateProduct.value);

  }
}
