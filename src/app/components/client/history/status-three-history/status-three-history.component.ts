import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { CustomerBillResponse } from 'src/app/dto/response/CustomerBillResponse';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-status-three-history',
  templateUrl: '../all-history/all-history.component.html',
})
export class StatusThreeHistoryComponent implements OnInit {
  hovering: boolean;
  listHistory: any;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private _location: Location
  ) {
    this.hovering = false;
  }

  ngOnInit(): void {
    this._location.go('user/account/history');
    this.getHistory();
  }
  public getHistory() {
    this.customerService.getHistory('3').subscribe({
      next: (v) => {
        console.log('get history successfully...{}', v);
        this.listHistory = v;
      },
      error: (e) => {
        console.log('get history fail...{}', e);
      },
    });
  }

  buyAgain(idProduct: number) {
    console.log('id product: {}', idProduct);
    if (idProduct != undefined) {
      this.router.navigate(['product/' + idProduct]);
    }
  }
}
