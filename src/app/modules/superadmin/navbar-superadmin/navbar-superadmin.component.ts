import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar-superadmin',
  templateUrl: './navbar-superadmin.component.html',
  styleUrls: ['./navbar-superadmin.component.css']
})
export class NavbarSuperadminComponent {

  constructor(private toastr$: ToastrService){

  }

  logout(){
    localStorage.removeItem("token");
    this.toastr$.success('Sesión cerrada');
  }

}
