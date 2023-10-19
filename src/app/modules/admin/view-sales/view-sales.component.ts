import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/interfaces/Branchs';
import { BranchService } from 'src/app/services/branch.service';
import { SaleService } from 'src/app/services/sale.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleDTO } from 'src/app/interfaces/Sales';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.css']
})
export class ViewSalesComponent {
  branchs: Branch[];
  idSelectedBranch: string;
  formChooseBranch: FormGroup;
  salesDTO: SaleDTO[];

  constructor(private sale$: SaleService, private branch$: BranchService, 
    private $formBuilder: FormBuilder, private toastr$: ToastrService, private router$: Router){
    this.idSelectedBranch = "";
    this.branchs = []
    this.salesDTO = []

    this.formChooseBranch = this.$formBuilder.group({
      branchId: ['', Validators.required],
    }); 
  }

ngOnInit(): void {
  this.getBranchs()
  
  this.formChooseBranch.get('branchId')?.valueChanges.subscribe(
    (branchId: string) => {


      
      if (branchId) {
        this.idSelectedBranch = branchId
        this.getSalesByBranchId();
      } 

    }
  );
    
}

getBranchs(){
  this.branch$.getAllBranch().subscribe(
    {
      next: (listBranchs) => {
        this.branchs = listBranchs;
      },
      error: (e) => {
        if(e.error === 'JWTExpired'){
          localStorage.removeItem("token");
          this.toastr$.error('Sesión expirada');
          this.router$.navigate(['/login']);
        }
      },
      complete: () => { },
    }
  );
}

getSalesByBranchId(){
  this.sale$.getSalesByBranchId(this.idSelectedBranch).subscribe(
    {
      next: (listSales) => {
     
        this.salesDTO = listSales;
      },
      error: (e) => {
        if(e.error === 'JWTExpired'){
          localStorage.removeItem("token");
          this.toastr$.error('Sesión expirada');
          this.router$.navigate(['/login']);
        }
      },
      complete: () => { },
    }
  );
}


}
