import { Component, Input, OnDestroy, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy{

  @Input() product!: Product;
  subscriptionToUpdatedProduct!: Subscription;
  subscriptionToUpdatedStock!: Subscription;

  constructor(private $websocket: WebsocketService, private $product: ProductService){
  }
  ngOnInit(): void {
    this.$websocket.initializeWebSocketConnection("productUpdated");
    this.subscriptionToUpdatedProduct = this.$websocket.receiveMessages().subscribe((product:Product) => {

      this.product.productInventoryStock = product.productInventoryStock;

    });
  }
  ngOnDestroy(): void {
      this.subscriptionToUpdatedProduct.unsubscribe();
  }
  addStock(productId: string){
    const respuesta = window.prompt('Ingrese el stock a añadir: ')


    
    if (respuesta !== null) {
      const stock:number = parseInt(respuesta);

      this.$product.updateStock(productId,stock).subscribe(
        {
          next: (product) => {
            console.log(product)
            //this.product = product;
          },
          error: (e) => {
            console.log(e)
          },
          complete: () => { },
        }
      );
    
    
    } else {
      alert('No ingresaste ningún valor.');
    }
  }


}
