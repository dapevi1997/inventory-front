import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { BranchAdminComponent } from './branch-admin/branch-admin.component';
import { SalesAdminComponent } from './sales-admin/sales-admin.component';
import { ViewSalesComponent } from './view-sales/view-sales.component';
import { ReportsComponent } from './reports/reports.component';
// import { GraficaComponent } from './grafica/grafica.component';
// import { ListaRadaresComponent } from './lista-radares/lista-radares.component';
// import { PromediosComponent } from './promedios/promedios.component';
// import { RadarEspecificoComponent } from './radar-especifico/radar-especifico.component';
// import { RadarComponent } from './radar/radar.component';
// import { UsersComponent } from './users/users.component';
// import { HomeAdminComponent } from './home-admin/home-admin.component';
// import { ListUsersComponent } from './list-users/list-users.component';


const routes: Routes = [
  {
    path:"",
    children:[
    {
      path:"", component:HomeAdminComponent
     },
    {
      path:"products", component: ProductAdminComponent
    },
    {
      path:"branchs", component: BranchAdminComponent
    },
    {
      path:"sales", component: SalesAdminComponent
    },
    {
      path:"sales/view-sales", component: ViewSalesComponent
    },
    {
      path:"products/reports", component: ReportsComponent
    }
    // {
    //   path:"list-radars", component: ListaRadaresComponent
    // },
    // {
    //   path:"radar-especifico", component: RadarEspecificoComponent
    // },
    // {
    //      path:"promedios",
    //      component: PromediosComponent
    // },
    // {
    //      path:"grafica",
    //      component: GraficaComponent
    // },
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }