import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { BodyAddProduct, Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit, OnDestroy {

  products: Product[];
  formAddProduct: FormGroup;
  subscriptionToAddProduct!: Subscription;

 

  constructor(private $product: ProductService, private $formBuilder: FormBuilder, private $websocket: WebsocketService) {
  
    this.products = [];
   
    this.formAddProduct = this.$formBuilder.group({
      branchId: ['', Validators.required],
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', Validators.required],
      productInventoryStock: ['', Validators.required],
      productCategory: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.getProducts();
    this.$websocket.initializeWebSocketConnection("productAdded");
   

   this.subscriptionToAddProduct = this.$websocket.receiveMessages().subscribe((product) => {
      this.products.push(product);
      console.log(this.products)

    });
  }

  ngOnDestroy(): void {
      this.subscriptionToAddProduct.unsubscribe();
  }


  getProducts() {
    this.$product.getAllProduts().subscribe(
      {
        next: (listProduts) => {
          this.products = listProduts;
        },
        error: (e) => {
          console.log(e)
        },
        complete: () => { },
      }
    );
  }
  onSubmitFormAddProduct() {
    if (this.formAddProduct.valid) {
      let body: BodyAddProduct = {
        branchId: this.formAddProduct.value.branchId,
        productName: this.formAddProduct.value.productName,
        productDescription: this.formAddProduct.value.productDescription,
        productPrice: this.formAddProduct.value.productPrice,
        productInventoryStock: this.formAddProduct.value.productInventoryStock,
        productCategory: this.formAddProduct.value.productCategory
      }

      this.$product.addProduct(body).subscribe(
        {
          next: (product) => {
            console.log(product);
          },
          error: (e) => {
            console.log(e)
          },
          complete: () => { },
        }
      );
    }
  }


}
