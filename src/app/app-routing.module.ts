import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './modules/admin/home-admin/home-admin.component';
import { LoginComponent } from './modules/login/login/login.component';
import { RegisterComponent } from './modules/login/register/register.component';
import { HomeSuperadminComponent } from './modules/superadmin/home-superadmin/home-superadmin.component';
import { SuperadminComponent } from './modules/superadmin/superadmin/superadmin.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'adm',
    component: HomeAdminComponent,
    loadChildren: ()=> import("./modules/admin/admin.module").then(module => module.AdminModule)
  },
  {
    path:'superadmin',
    component: HomeSuperadminComponent,
    loadChildren: ()=> import("./modules/superadmin/superadmin.module").then(module => module.SuperadminModule)
  },
  {
    path:'register',
    component: RegisterComponent
  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
