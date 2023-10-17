import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SalesDTO } from '../interfaces/Sales';
import { Observable } from 'rxjs';
import { Sale } from '../interfaces/Sales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private $httpClient: HttpClient) { }

  getSalesByBranchId(branchId: string): Observable <SalesDTO>{
    let direction = environment.apiQueryService + 'api/v1/sales/' + branchId;

    return this.$httpClient.get<SalesDTO>(direction);
  }

  saveWholesale(sale: Sale): Observable <any>{
    let direction = environment.apiCommandService + 'api/v1/sale/register/wholesale';

    return this.$httpClient.post<any>(direction,sale);
  }

  saveRetail(sale: Sale): Observable <any>{
    let direction = environment.apiCommandService + 'api/v1/sale/register/retail';

    return this.$httpClient.post<any>(direction,sale);
  }
}
