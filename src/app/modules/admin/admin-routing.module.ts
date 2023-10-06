import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
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