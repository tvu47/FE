import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private httpService: HttpServiceService,
    private adminService: AdminserviceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductServiceService) { }

  public listCategory: any = [];

  ngOnInit(): void {
    this.getAllCategory();
  }

  public currentPage: any = 1;

  public pageChange(page: any) {
    this.currentPage = page;
  }

  public formNewCategory = this.formBuilder.group({
    categoryName: ['', Validators.required],
    status: ['true']
  });

  public formUpdateCategory = this.formBuilder.group({
    id: ['', Validators.required],
    categoryName: ['', Validators.required],
    status: ['true']
  });

  public cateUpdate: any;

  public chooseCategoryUpdate(cate: any) {
    this.cateUpdate = cate;
  }

  public updateCategory() {
    console.log(this.formUpdateCategory.value);
    if (this.formUpdateCategory.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Vui lòng nhập đầy đủ thông tin',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    this.httpService.postWithToken("api/v1/category/update", this.adminService.getToken(), this.formUpdateCategory.value).subscribe(data => {
      this.getAllCategory();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.content,
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public submitAddNewCategory() {
    console.log(this.formNewCategory.value);
    if (this.formNewCategory.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Vui lòng nhập đầy đủ thông tin',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    this.httpService.postWithToken("api/v1/category", this.adminService.getToken(), this.formNewCategory.value).subscribe(data => {
      this.getAllCategory();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thêm thành công',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public deleteCate(cate: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Từ chối',
    }).then((result) => {
      localStorage.removeItem('customer_information');
      if (result.isConfirmed) {
        this.httpService.postWithToken("api/v1/category/" + cate.id, this.adminService.getToken(), null).subscribe(data => {
          this.getAllCategory();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.content,
            showConfirmButton: false,
            timer: 1500
          })
        });
      }
    });
  }

  private getAllCategory() {
    this.httpService.get("api/v1/category").subscribe(data => {
      console.log("all category", data);
      this.listCategory = data;
    });
  }

}
