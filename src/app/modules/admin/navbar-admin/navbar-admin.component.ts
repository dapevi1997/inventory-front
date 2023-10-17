import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {

  constructor(private router$: Router,private toastr$: ToastrService){

  }

  logout(){
    localStorage.removeItem("token");
    this.toastr$.success('Sesión cerrada');
  }


}
