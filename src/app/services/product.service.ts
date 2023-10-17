import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyAddProduct, Product, Products } from '../interfaces/Product';
import { environment } from 'src/environments/environment';
import { Sale } from '../interfaces/Sales';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private $httpClient: HttpClient) { }

  getAllProduts(): Observable <Products>{
    let direction = environment.apiQueryService + 'api/v1/products';

    return this.$httpClient.get<Products>(direction);
  }

  getProdutById(idProduct:string): Observable <Product>{
    let direction = environment.apiQueryService + 'api/v1/product/' + idProduct;

    return this.$httpClient.get<Product>(direction);
  }

  addProduct(product: BodyAddProduct): Observable <any>{
    let direction = environment.apiCommandService + 'api/v1/product/register';

    return this.$httpClient.post<any>(direction,product);
  }


  updateStock(idProduct: string, stock: number): Observable <any>{
    let direction = environment.apiCommandService + 'api/v1/product/update';

    let body = {
      "idProduct": idProduct,
      "productInventoryStock": stock
    }

    return this.$httpClient.put<any>(direction,body);
  }



}
