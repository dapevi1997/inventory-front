import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BranchService } from 'src/app/services/branch.service';
import { Branch } from 'src/app/interfaces/Branchs';
import { UserService } from 'src/app/services/user.service';
import { SaveUserBody } from 'src/app/interfaces/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
  formUserSave!: FormGroup;
  branchs: Branch[];
  roles:string[];

  constructor(private $branch: BranchService, private user$: UserService, private toastr$: ToastrService){
    this.branchs = [];
    this.roles = ["ROLE_SUPERADMIN", "ROLE_ADMIN", "ROLE_USER"];

    this.formUserSave = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userLastName: new FormControl(null, [Validators.required]),
      userPassword: new FormControl(null, [Validators.required]),
      userEmail: new FormControl(null, [Validators.required]),
      userRole: new FormControl(null, [Validators.required]),
      branchId: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
      this.getBranchs();
  }

  getBranchs() {
    this.$branch.getAllBranch().subscribe(
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

  guardarUsuario(){

    let body: SaveUserBody = {
      branchId: this.formUserSave.value.branchId,
      userName: this.formUserSave.value.userName,
      userLastname: this.formUserSave.value.userLastName,
      userPassword: this.formUserSave.value.userPassword,
      userEmail: this.formUserSave.value.userEmail,
      userRole: this.formUserSave.value.userRole
    }

    this.user$.saveUser(body).subscribe(
      {
        next: (aswer) => {
          console.log(aswer);
          this.toastr$.success('Usuario registrado!');
        },
        error: (e) => {
          console.log(e)
        },
        complete: () => { },
      }
    );



  }

}
