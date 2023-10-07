import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch } from 'src/app/interfaces/Branchs';
import { Product } from '../../../interfaces/Product';
import { BranchService } from 'src/app/services/branch.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductInCar, ProductSale } from 'src/app/interfaces/ProductSale';
import { filter, map, Observable } from 'rxjs';
import { Sale } from 'src/app/interfaces/Sales';
import { ProductSalesUtil } from '../../../interfaces/Sales';

@Component({
  selector: 'app-sales-admin',
  templateUrl: './sales-admin.component.html',
  styleUrls: ['./sales-admin.component.css']
})
export class SalesAdminComponent implements OnInit, OnDestroy{

  formAddProductToCar: FormGroup;
  branchs: Branch[];
  products: Product[];
  car: ProductInCar[];
  idSelectedBranch: string;

  constructor(private $formBuilder: FormBuilder,private branch$: BranchService, private product$: ProductService){
    this.idSelectedBranch = "";
    this.products = [];
    this.branchs = [];
    this.car = [];
    this.formAddProductToCar = this.$formBuilder.group({
      branchId: ['', Validators.required],
      productSaleId: [{value:'', disabled : true}, Validators.required],
      productSaleStock: [{value:'' , disabled:true}, Validators.required],
    }); 
  }

  ngOnInit(): void {
      this.getBranches();
  

      this.formAddProductToCar.get('branchId')?.valueChanges.subscribe(
        (branchId: string) => {
          
          if (branchId) {
            this.idSelectedBranch = branchId
          
           this.getProductsByIdBranch(branchId);
            this.formAddProductToCar.get('productSaleId')!.enable();
          } else {
            this.formAddProductToCar.get('productSaleId')!.disable();
          }
          if (branchId) {
            this.formAddProductToCar.get('productSaleStock')!.enable();
          } else {
            this.formAddProductToCar.get('productSaleStock')!.disable();
          }

        }
      );
  }

  ngOnDestroy(): void {
      
  }

  onSubmitFormAddProductToCar(){
   let idProduct =  this.formAddProductToCar.get('productSaleId')!.value
   let amount =  this.formAddProductToCar.get('productSaleStock')!.value

   let product: Product | undefined = this.products.find(product1=> product1.productId === idProduct ); 

   if(product){
    let produtoForCar:ProductInCar = {
      id: idProduct,
      name: product.productName,
      price: product.productPrice,
      amount: amount
    }
    this.car.push(produtoForCar);


   }else{
    console.log("no existe producto en el array")

   }

  

   
  }

  getBranches(){
    this.branch$.getAllBranch().subscribe(
      {
        next: (listBranchs) => {
          this.branchs = listBranchs;
        },
        error: (e) => {
          console.log(e)
        },
        complete: () => { },
      }
    );
  }

  getProducts(){
    this.product$.getAllProduts().subscribe(
      {
        next: (listProducts) => {
         
          this.products = listProducts;
        },
        error: (e) => {
          console.log(e)
        },
        complete: () => { },
      }
    );
  }

  getProductsByIdBranch(idbranch: string){
    this.product$.getAllProduts().pipe(
      map((products) =>{ 
    
       return products.filter((product) => {
      
         return product.branchId === idbranch
       }
      
       )
      })
    ).subscribe((listProducts)=>{
     
        this.products = listProducts;
      
      
    }
     
    )
  }

  saveWholesale(){
    let productSaleUtils: ProductSalesUtil[]=[]; 
    this.car.forEach(
      (product) =>{
        let productsaleUtil : ProductSalesUtil = {
          productSaleId: product.id,
          productSaleStock: product.amount
        }

        productSaleUtils.push(productsaleUtil)

      }
    );
    let sale: Sale ={
      branchId: this.idSelectedBranch,
      productSalesUtil: productSaleUtils
    } 

    console.log(sale)

    this.product$.saveWholesale(sale).subscribe(
      {
        next: (sale) => {
          console.log("Venta registrada")
         
        },
        error: (e) => {
          console.log(e)
        },
        complete: () => { },
      }
    );

  }

}
