import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-superadmin',
  templateUrl: './navbar-superadmin.component.html',
  styleUrls: ['./navbar-superadmin.component.css']
})
export class NavbarSuperadminComponent {

  logout(){
    localStorage.removeItem("token");
  }

}
