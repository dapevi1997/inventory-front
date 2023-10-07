import { Component, Input, OnInit } from '@angular/core';
import { ProductInCar } from 'src/app/interfaces/ProductSale';

@Component({
  selector: 'app-product-in-car',
  templateUrl: './product-in-car.component.html',
  styleUrls: ['./product-in-car.component.css']
})
export class ProductInCarComponent implements OnInit {
  @Input() productInCar!: ProductInCar;

  constructor(){}
ngOnInit(): void {
    
}

}
