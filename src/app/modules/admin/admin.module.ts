import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchAdminComponent } from './branch-admin/branch-admin.component';
import { BranchComponent } from './branch/branch.component';
import { SalesAdminComponent } from './sales-admin/sales-admin.component';
import { SalesComponent } from './sales/sales.component';
import { ProductInCarComponent } from './product-in-car/product-in-car.component';
import { ViewSalesComponent } from './view-sales/view-sales.component';




@NgModule({
  declarations: [
    NavbarAdminComponent,
    HomeAdminComponent,
    ProductAdminComponent,
    ProductComponent,
    BranchAdminComponent,
    BranchComponent,
    SalesAdminComponent,
    SalesComponent,
    ProductInCarComponent,
    ViewSalesComponent,
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    HomeAdminComponent,
    ProductAdminComponent
  ]
    
})
export class AdminModule { }
