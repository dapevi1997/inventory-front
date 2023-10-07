import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/interfaces/Branchs';
import { BranchService } from 'src/app/services/branch.service';
import { SaleService } from 'src/app/services/sale.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleDTO } from 'src/app/interfaces/Sales';


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

  constructor(private sale$: SaleService, private branch$: BranchService,private $formBuilder: FormBuilder){
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
        console.log(e)
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
        console.log(e)
      },
      complete: () => { },
    }
  );
}


}
