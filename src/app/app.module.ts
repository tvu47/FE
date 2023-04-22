import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import {
  HttpClientModule,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';
import { LoginService } from './services/client/login.service';
import { PaymentComponent } from './components/payment/payment.component';
import { BillComponent } from './components/admin/bill/bill.component';
import { HomeadminComponent } from './components/admin/homeadmin/homeadmin.component';
import { AsideComponent } from './components/admin/aside/aside.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { LoginadminComponent } from './components/admin/loginadmin/loginadmin.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ProductManagerComponent } from './components/admin/product-manager/product-manager.component';
import { UserManagerComponent } from './components/admin/user-manager/user-manager.component';
import { SidebarClientComponent } from './client/sidebar/sidebar-client/sidebar-client.component';
import { UserInfomationComponent } from './components/client/user-infomation/user-infomation.component';
import { HistoryComponent } from './components/client/history/history.component';
import { CompanyTabDirective } from './components/client/company-tab.directive';
import { ManagerComponent } from './components/client/manager/manager.component';
import { MaintainComponent } from './components/maintain/maintain.component';
import { SessionService } from './services/client/session.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CustomerService } from './services/customer.service';
import { VoucherManagerComponent } from './components/admin/voucher-manager/voucher-manager.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderService } from './loader.service';
import { LoadingInterceptor } from './loading.interceptor';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { SearchProductNameComponent } from './components/search-product-name/search-product-name.component';
import { DirectDirective } from './components/client/history/direct.directive';
import { AllHistoryComponent } from './components/client/history/all-history/all-history.component';
import { StatusOneHistoryComponent } from './components/client/history/status-one-history/status-one-history.component';
import { StatusTwoHistoryComponent } from './components/client/history/status-two-history/status-two-history.component';
import { StatusThreeHistoryComponent } from './components/client/history/status-three-history/status-three-history.component';
import { StatusFourHistoryComponent } from './components/client/history/status-four-history/status-four-history.component';
import { StatusFiveHistoryComponent } from './components/client/history/status-five-history/status-five-history.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ThongKeComponent } from './components/admin/thong-ke/thong-ke.component';
import { CategoryComponent } from './components/admin/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    PaymentComponent,
    BillComponent,
    HomeadminComponent,
    AsideComponent,
    NavbarComponent,
    LoginadminComponent,
    ProductManagerComponent,
    UserManagerComponent,
    ManagerComponent,
    SidebarClientComponent,
    UserInfomationComponent,
    HistoryComponent,
    CompanyTabDirective,
    MaintainComponent,
    VoucherManagerComponent,
    SpinnerComponent,
    CategoryProductComponent,
    SearchProductNameComponent,
    DirectDirective,
    AllHistoryComponent,
    StatusOneHistoryComponent,
    StatusTwoHistoryComponent,
    StatusThreeHistoryComponent,
    StatusFourHistoryComponent,
    StatusFiveHistoryComponent,
    ThongKeComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    LoginService,
    LoaderService,
    SessionService,
    FormBuilder,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    CustomerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
