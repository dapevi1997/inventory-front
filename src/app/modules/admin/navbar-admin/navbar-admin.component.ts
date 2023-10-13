import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {

  constructor(private router$: Router){

  }

  logout(){
    localStorage.removeItem("token");
    this.router$.navigate(['/login']);
  }
}
