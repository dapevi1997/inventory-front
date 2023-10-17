import { Component, Input, OnDestroy, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductSalesUtil } from 'src/app/interfaces/Sales';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy{

  @Input() product!: Product;
  subscriptionToUpdatedProduct!: Subscription;
  subscriptionToUpdatedStock!: Subscription;
  subscriptionToWholeSale!: Subscription;
  subscriptionToRetail!: Subscription;

  constructor(private $websocket: WebsocketService, private $product: ProductService,
    private toastr$: ToastrService, private router$: Router){
  }
  ngOnInit(): void {

    this.subscriptionToUpdatedProduct = this.$websocket.initializeWebSocketConnection("productUpdated")
    .subscribe((product)=>{
                 if (product.idProduct === this.product.productId){
         this.product.productInventoryStock = product.productInventoryStock;
       }
    });

    this.subscriptionToWholeSale = this.$websocket.initializeWebSocketConnection("wholeSale").subscribe( (listProducts: ProductSalesUtil[])=>{
          listProducts.forEach(produc=>{
         if(produc.productSaleId === this.product.productId){

              this.product.productInventoryStock = this.product.productInventoryStock - produc.productSaleStock;
         }

      }
    )});

    this.subscriptionToRetail = this.$websocket.initializeWebSocketConnection("retail").subscribe( (listProducts: ProductSalesUtil[])=>{
      listProducts.forEach(produc=>{
     if(produc.productSaleId === this.product.productId){

          this.product.productInventoryStock = this.product.productInventoryStock - produc.productSaleStock;
     }

  }
)});






  }
  ngOnDestroy(): void {
      this.subscriptionToUpdatedProduct.unsubscribe();
      this.subscriptionToWholeSale.unsubscribe();
      this.subscriptionToRetail.unsubscribe();
      //this.subscriptionToUpdatedStock.unsubscribe();
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
