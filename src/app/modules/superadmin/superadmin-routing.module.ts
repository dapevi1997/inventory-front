import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSuperadminComponent } from './home-superadmin/home-superadmin.component';
import { UserFormComponent } from './user-form/user-form.component';
import { BranchAdminComponent } from '../admin/branch-admin/branch-admin.component';




const routes: Routes = [
  {
    path:"",
    children:[
    {
      path:"", component:UserFormComponent
     },
     {
      path:"branchs", component:BranchAdminComponent
     },
    
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }