import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/Product';
import { environment } from 'src/environments/environment';
import { BodyAddBranch, Branchs } from '../interfaces/Branchs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private $httpClient: HttpClient) { }

  getAllBranch(): Observable <Branchs>{
    let direction = environment.apiQueryService + 'api/v1/branchs';

    return this.$httpClient.get<Branchs>(direction);
  }

  addBranch(branch: BodyAddBranch): Observable <any>{
    let direction = environment.apiCommandService + 'api/v1/branch/register';

    return this.$httpClient.post<any>(direction,branch);
  }
}
