import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSuperadminComponent } from './home-superadmin/home-superadmin.component';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { NavbarSuperadminComponent } from './navbar-superadmin/navbar-superadmin.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeSuperadminComponent,
    NavbarSuperadminComponent,
    SuperadminComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    ReactiveFormsModule
  ]
})
export class SuperadminModule { }
