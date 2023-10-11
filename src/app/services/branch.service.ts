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
    console.log( "HOST8081: " + window._env.HOST_8081)
    console.log( "HOST8080: " + window._env.HOST_8080)
    console.log( "HOST8082: " + window._env.HOST_8082)
    let direction = window._env.HOST_8081 + 'api/v1/branchs';

  

    return this.$httpClient.get<Branchs>(direction);
  }

  addBranch(branch: BodyAddBranch): Observable <any>{
    let direction = window._env.HOST_8080 + 'api/v1/branch/register';

    return this.$httpClient.post<any>(direction,branch);
  }
}
