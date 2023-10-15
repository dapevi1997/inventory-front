import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyAddBranch, Branch } from 'src/app/interfaces/Branchs';
import { BranchService } from 'src/app/services/branch.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-admin',
  templateUrl: './branch-admin.component.html',
  styleUrls: ['./branch-admin.component.css']
})
export class BranchAdminComponent implements OnInit, OnDestroy{
  formAddBranch: FormGroup;
  branchs: Branch[];
  subscriptionToAddBranch!: Subscription;

  constructor(private $branch: BranchService, private $formBuilder: FormBuilder, private $websocket: WebsocketService,
    private toastr$: ToastrService, private router$: Router){

    this.branchs = [];

    this.formAddBranch = this.$formBuilder.group({
      branchName: ['', Validators.required],
      branchCountry: ['', Validators.required],
      branchCity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
      this.getBranchs();
      this.$websocket.initializeWebSocketConnection("branchAdded");

      this.subscriptionToAddBranch = this.$websocket.receiveMessages().subscribe((branch) => {
        console.log(branch)
        this.branchs.push(branch);
        
  
      });
  }

  ngOnDestroy(): void {
    this.subscriptionToAddBranch.unsubscribe();
  }

  getBranchs() {
    this.$branch.getAllBranch().subscribe(
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

  onSubmitFormAddBranch(){
    if (this.formAddBranch.valid) {
      let body: BodyAddBranch = {
        branchName: this.formAddBranch.value.branchName,
        branchCountry: this.formAddBranch.value.branchCountry,
        branchCity: this.formAddBranch.value.branchCity,
      }

      this.$branch.addBranch(body).subscribe(
        {
          next: (product) => {
            console.log(product);
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

}
