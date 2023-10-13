import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SalesDTO } from '../interfaces/Sales';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private $httpClient: HttpClient) { }

  getSalesByBranchId(branchId: string): Observable <SalesDTO>{
    let direction = environment.apiQueryService + 'api/v1/sales/' + branchId;

    return this.$httpClient.get<SalesDTO>(direction);
  }
}
