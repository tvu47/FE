import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerBillResponse } from 'src/app/dto/response/CustomerBillResponse';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-status-two-history',
  templateUrl: '../all-history/all-history.component.html',
})
export class StatusTwoHistoryComponent implements OnInit {
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
    this.customerService.getHistory('1').subscribe({
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
