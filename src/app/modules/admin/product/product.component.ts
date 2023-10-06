import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy{

  @Input() product!: Product;
  subscriptionToUpdatedProduct!: Subscription;

  constructor(private $websocket: WebsocketService){
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

}
