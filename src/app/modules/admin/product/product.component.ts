import { Component, Input, OnDestroy, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy{

  @Input() product!: Product;
  subscriptionToUpdatedProduct!: Subscription;
  subscriptionToUpdatedStock!: Subscription;

  constructor(private $websocket: WebsocketService, private $product: ProductService,
    private toastr$: ToastrService, private router$: Router){
  }
  ngOnInit(): void {
    this.$websocket.initializeWebSocketConnection("productUpdated");
    this.subscriptionToUpdatedProduct = this.$websocket.receiveMessages().subscribe((product) => {

      if (product.idProduct === this.product.productId){
        this.product.productInventoryStock = product.productInventoryStock;
      }

    

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
          next: (event) => {
            
         
            this.product.productInventoryStock = event.productInventoryStock;
          
          },
          error: (e) => {
            if(e.error === 'JWTExpired'){
              localStorage.removeItem("token");
              this.toastr$.error('Sesión expirada');
              this.router$.navigate(['/login']);
            }
          },
          complete: () => { },
        }
      );
    
    
    } else {
      alert('No ingresaste ningún valor.');
    }
  }


}
