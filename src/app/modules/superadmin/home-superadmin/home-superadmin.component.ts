import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-superadmin',
  templateUrl: './home-superadmin.component.html',
  styleUrls: ['./home-superadmin.component.css']
})
export class HomeSuperadminComponent {

  constructor(private toastr$: ToastrService, private router$: Router){
    if(localStorage.getItem("token")==="" || localStorage.getItem("token")=== null){
      this.toastr$.error('Por favor, inicia sesión');
      this.router$.navigate(['/login']);

    }
  
  }

}
