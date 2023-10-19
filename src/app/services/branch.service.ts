import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Products } from '../interfaces/Product';
import { environment } from 'src/environments/environment';
import { BodyAddBranch, Branchs } from '../interfaces/Branchs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private $httpClient: HttpClient,private toastr$: ToastrService ) { }

  getAllBranch(): Observable <Branchs>{
    let direction = environment.apiQueryService + 'api/v1/branchs';

    console.log(environment.apiQueryService)
    console.log(window._env.apiQueryService)

  

    return this.$httpClient.get<Branchs>(direction);
  }

  addBranch(branch: BodyAddBranch): Observable <any>{
    let direction = environment.apiCommandService + 'api/v1/branch/register';

    return this.$httpClient.post<any>(direction,branch);
  }
}
