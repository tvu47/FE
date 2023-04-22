import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './components/client/manager/manager.component';
import { BillComponent } from './components/admin/bill/bill.component';
import { HomeadminComponent } from './components/admin/homeadmin/homeadmin.component';
import { LoginadminComponent } from './components/admin/loginadmin/loginadmin.component';
import { ProductManagerComponent } from './components/admin/product-manager/product-manager.component';
import { UserManagerComponent } from './components/admin/user-manager/user-manager.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { MaintainComponent } from './components/maintain/maintain.component';
import { VoucherManagerComponent } from './components/admin/voucher-manager/voucher-manager.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { SearchProductNameComponent } from './components/search-product-name/search-product-name.component';
import { HistoryComponent } from './components/client/history/history.component';
import { ThongKeComponent } from './components/admin/thong-ke/thong-ke.component';
import { CategoryComponent } from './components/admin/category/category.component';

const routes: Routes = [
  { path: 'product/:id', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'user/account/profile', component: ManagerComponent },
  { path: 'user/account/history', component: ManagerComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'admin/bill', component: BillComponent },
  { path: 'admin/thong-ke', component: ThongKeComponent },
  { path: 'admin/login', component: LoginadminComponent },
  { path: 'admin/products', component: ProductManagerComponent },
  { path: 'admin/vouchers', component: VoucherManagerComponent },
  { path: 'admin/users', component: UserManagerComponent },
  { path: 'maintain', component: MaintainComponent },
  { path: 'admin/category', component: CategoryComponent },
  { path: 'category/:id', component: CategoryProductComponent },
  { path: 'product-name/:name', component: SearchProductNameComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
