import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Branch } from 'src/app/interfaces/Branchs';
import { Product } from '../../../interfaces/Product';
import { BranchService } from 'src/app/services/branch.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductInCar, ProductSale } from 'src/app/interfaces/ProductSale';
import { filter, map, Observable } from 'rxjs';
import { Sale } from 'src/app/interfaces/Sales';
import { ProductSalesUtil } from '../../../interfaces/Sales';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';

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
  typeOfSales: string[];


 


  constructor(private $formBuilder: FormBuilder,private branch$: BranchService, private product$: ProductService,
    private toastr$: ToastrService, private router$: Router, private sale$: SaleService){
    this.idSelectedBranch = "";
    this.products = [];
    this.branchs = [];
    this.car = [];

    this.typeOfSales = ["Venta al detal", "Venta al por mayor"];
    this.formAddProductToCar = this.$formBuilder.group({
      branchId: ['', Validators.required],
      typeofSale: ['', Validators.required],
      productSaleId: [{value:'', disabled : true}, Validators.required],
      productSaleStock: [{value:'' , disabled:true}, [Validators.required]],
    }); 
  }



  ngOnInit(): void {
      this.getBranches();


      this.formAddProductToCar.get('productSaleId')?.valueChanges.subscribe(
        (productSaleId)=>{
          console.log(this.formAddProductToCar)

         let productId = this.formAddProductToCar.value.productSaleId;
         let productSaleStock = this.formAddProductToCar.value.productSaleStock;

         if(productId){
          this.product$.getProdutById(productId).subscribe(
            product => {
              if(product.productInventoryStock < productSaleStock){
  
                   this.toastr$.error('La cantidad del producto supera el stock disponible');
                   this.toastr$.warning('La cantidad disponible es ' + product.productInventoryStock);
                   this.formAddProductToCar.get('productSaleStock')?.setErrors({noStock : true});
             
                  
             
              }
            }
           );
         }


  
        }
      );

      this.formAddProductToCar.get('productSaleStock')?.valueChanges.subscribe(
        (productSaleStock)=>{

         let productId = this.formAddProductToCar.value.productSaleId;

         if(productId){
          this.product$.getProdutById(productId).subscribe(
            product => {
              if(product.productInventoryStock < productSaleStock){
  
                   this.toastr$.error('La cantidad del producto supera el stock disponible');
                   this.toastr$.warning('La cantidad disponible es ' + product.productInventoryStock);
                   this.formAddProductToCar.get('productSaleStock')?.setErrors({noStock : true});

                   console.log(this.formAddProductToCar)
                
                 
                   

              }
            }
           );
         }

  
        }
      );

      this.formAddProductToCar.get('typeofSale')?.valueChanges.subscribe(
        (typeOfSale)=>{
          if(typeOfSale === 'Venta al detal'){
            this.formAddProductToCar.patchValue({
              productSaleStock: 1
            });
            
              //this.formAddProductToCar.get('productSaleStock')!.disable();
          }else if (typeOfSale === 'Venta al por mayor'){
            //this.formAddProductToCar.get('productSaleStock')!.enable();
          }
        }
      );
  

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
      amount: amount,
      type: this.formAddProductToCar.get('typeofSale')!.value
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
          if(e.error === 'JWTExpired'){
            localStorage.removeItem("token");
            this.toastr$.error('Sesión expirada');
            this.router$.navigate(['/login']);
          }
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
          if(e.error === 'JWTExpired'){
            localStorage.removeItem("token");
            this.toastr$.error('Sesión expirada');
            this.router$.navigate(['/login']);
          }
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
     if(listProducts.length === 0){
      this.toastr$.warning('Al parecer aún no se han asignado productos a esta sucursal. Contacta con un administrador');
     }else{
      this.products = listProducts;
     }
      

  
      
      
    }
     
    )
  }

  saveWholesale(){

if(this.car.length === 0){
  this.toastr$.error('No hay productos en el carrito');

}else{
  
  let productSaleUtilsForWholeSale: ProductSalesUtil[]=[]; 
  let productSaleUtilsForRetail: ProductSalesUtil[]=[]; 
  this.car.forEach(
    (product) =>{
      if (product.type === "Venta al por mayor"){
      
        let productsaleUtil : ProductSalesUtil = {
          productSaleId: product.id,
          productSaleStock: product.amount
        }
  
        productSaleUtilsForWholeSale.push(productsaleUtil);

    
      
      }else if(product.type === "Venta al detal"){
       
        let productsaleUtil : ProductSalesUtil = {
          productSaleId: product.id,
          productSaleStock: product.amount
        }
  
        productSaleUtilsForRetail.push(productsaleUtil);
    

     

      }


    }
  );

  if(productSaleUtilsForWholeSale.length != 0){
    console.log("whosale")
    let saleWholesale: Sale ={
      branchId: this.idSelectedBranch,
      productSalesUtil: productSaleUtilsForWholeSale
    } 
        this.sale$.saveWholesale(saleWholesale).subscribe(
      {
        next: (sale) => {
       
          this.toastr$.success('Venta al por mayor registrada!');

         
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

  }

  if(productSaleUtilsForRetail.length != 0){
    console.log("reatail")
    let saleRetail: Sale ={
      branchId: this.idSelectedBranch,
      productSalesUtil: productSaleUtilsForRetail
      
    } 

    this.sale$.saveRetail(saleRetail).subscribe(
      {
        next: (sale) => {
       
          this.toastr$.success('Venta al detal registrada!');

         
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
  
  }






}
  




  }

  logout(){
    localStorage.removeItem("token");
    this.toastr$.success('Sesión cerrada');
  }

}
