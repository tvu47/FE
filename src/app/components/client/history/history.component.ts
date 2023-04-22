import { animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerBillResponse } from 'src/app/dto/response/CustomerBillResponse';
import { CustomerService } from 'src/app/services/customer.service';
import { DirectDirective } from './direct.directive';
import { AllHistoryComponent } from './all-history/all-history.component';
import { StatusOneHistoryComponent } from './status-one-history/status-one-history.component';
import { StatusTwoHistoryComponent } from './status-two-history/status-two-history.component';
import { StatusThreeHistoryComponent } from './status-three-history/status-three-history.component';
import { StatusFourHistoryComponent } from './status-four-history/status-four-history.component';
import { StatusFiveHistoryComponent } from './status-five-history/status-five-history.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  _component: any;
  @ViewChild(DirectDirective, { static: true }) tabHost!: DirectDirective;
  constructor() {}
  ngOnInit(): void {
    this.loadComponent('ALL');
  }
  public tabSelect: any;

  loadComponent(_selectedTab: string) {
    this.tabSelect = _selectedTab;
    // remove loaded Component
    const viewContainerRef = this.tabHost.viewContainerRef;
    this._component = '';
    if (_selectedTab == 'ALL') this._component = AllHistoryComponent;
    else if (_selectedTab == 'CHOXACNHAN')
      this._component = StatusOneHistoryComponent;
    else if (_selectedTab == 'DANGVANCHUYEN')
      this._component = StatusTwoHistoryComponent;
    else if (_selectedTab == 'DAGIAOHANG')
      this._component = StatusThreeHistoryComponent;
    else if (_selectedTab == 'HOANTHANH')
      this._component = StatusFourHistoryComponent;
    else if (_selectedTab == 'DAHUY')
      this._component = StatusFiveHistoryComponent;

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<DirectDirective>(
      this._component
    );
  }
}
