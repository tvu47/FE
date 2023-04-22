import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { UserInfomationComponent } from '../user-infomation/user-infomation.component';
import { HistoryComponent } from '../history/history.component';
import { CompanyTabDirective } from '../company-tab.directive';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  _component: any;
  componentsList!: [];
  @ViewChild(CompanyTabDirective, { static: true })
  tabHost!: CompanyTabDirective;
  constructor() {}

  ngOnInit(): void {
    this.loadComponent('INFO');
  }

  loadComponent(_selectedTab: string) {
    // remove loaded Component
    const viewContainerRef = this.tabHost.viewContainerRef;
    this._component = '';
    if (_selectedTab == 'INFO') this._component = UserInfomationComponent;
    else if (_selectedTab == 'HISTORY') this._component = HistoryComponent;

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<CompanyTabDirective>(
      this._component
    );
  }
}
