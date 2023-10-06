import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyAddProduct, Product, Products } from '../interfaces/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private $httpClient: HttpClient) { }

  getAllProduts(): Observable <Products>{
    let direction = environment.apiQueryService + 'api/v1/products';

    return this.$httpClient.get<Products>(direction);
  }

  addProduct(product: BodyAddProduct): Observable <any>{
    let direction = environment.apiCommandService + 'api/v1/product/register';

    return this.$httpClient.post<any>(direction,product);
  }
}
