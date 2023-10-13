import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSuperadminComponent } from './home-superadmin/home-superadmin.component';
import { UserFormComponent } from './user-form/user-form.component';




const routes: Routes = [
  {
    path:"",
    children:[
    {
      path:"", component:UserFormComponent
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
export class SuperadminRoutingModule { }