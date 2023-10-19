import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Branch } from 'src/app/interfaces/Branchs';
import { BranchService } from 'src/app/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { filter, map, Observable, switchMap } from 'rxjs';
import { BodyAddProduct, Product } from 'src/app/interfaces/Product';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
  branchs!: Branch[];
  idSelectedBranch: string;
  category: string;
  formChooseBranch: FormGroup;
  products: Product[];
  productCategoryControl = new FormControl('');

  constructor(private $formBuilder: FormBuilder, private branch$: BranchService, private toastr$: ToastrService, 
     private router$: Router, private $product: ProductService, private print$: ReportService){
    this.idSelectedBranch = "";
    this.category = "";
    //this.branchs = [];
    this.products = [];

    this.formChooseBranch = this.$formBuilder.group({
      branchId: ['', Validators.required],
      productCategory: ['', Validators.required]
    }); 
  }

  ngOnInit(): void {
  
      this.getBranchs();
      this.getProducts();

      this.formChooseBranch.get('branchId')?.valueChanges.subscribe(
        (branchId: string) => {
       
          if (branchId) {
            this.idSelectedBranch = branchId
            this.filter(this.idSelectedBranch, this.category);
          } 
    
        }
      );
  }

  onPrint(){
    const head = ["Nombre", "Descripción", "Precio", "Inventario", "Categoría", "Sucursal"];
    let productAux:string[];
    let body: Array<Array<string>> = [];
    this.products.forEach(product=>{
      if(product.nameBranch){
        productAux = [product.productName,product.productDescription, product.productPrice.toString(),
          product.productInventoryStock.toString(), product.productCategory, product.nameBranch];
      }
     
      body.push(productAux) 
    });

    console.log(body)
  
    this.print$.print(head,body,"Productos en inventario", true);
  }

  onChange(){
    if(this.productCategoryControl.value){
    
      this.category = this.productCategoryControl.value;
    }else{
      this.category = "";
    }
  

    this.filter(this.idSelectedBranch, this.category);

  }

  filter(idBranch: string, category: string){



    if(idBranch==="all"){
      this.getProducts();
    }
     if(idBranch != "all" && idBranch != "" && category == ""){
      this.branch$.getAllBranch().pipe(
        switchMap(branches => {
    
          return this.$product.getAllProduts().pipe(
          
            map(
              productList=> {

               let productListAux = productList.filter(prduct=>{
                  return prduct.branchId === idBranch;
                })
    
                let productListAux2: Product[] = []; 
    
                productListAux.forEach(prduct=>{
                  branches.forEach(branch=>{
                    if (prduct.branchId == branch.branchId) {
                    
                        prduct.nameBranch = branch.branchName;
                    }
                  })
                  productListAux2.push(prduct);
                })
    
                return productListAux2;
    
              }
            )
          );
        })
       ).subscribe(
        {
          next: (listProduts: Product[]) => {
            this.products = listProduts;
            
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
     if(category != "" && idBranch == ""){
      this.branch$.getAllBranch().pipe(
        switchMap(branches => {
    
          return this.$product.getAllProduts().pipe(
          
            map(
              productList=> {

               let productListAux = productList.filter(prduct=>{
                  return prduct.productCategory === category;
                })
    
                let productListAux2: Product[] = []; 
    
                productListAux.forEach(prduct=>{
                  branches.forEach(branch=>{
                    if (prduct.branchId == branch.branchId) {
                    
                        prduct.nameBranch = branch.branchName;
                    }
                  })
                  productListAux2.push(prduct);
                })
    
                return productListAux2;
    
              }
            )
          );
        })
       ).subscribe(
        {
          next: (listProduts: Product[]) => {
            this.products = listProduts;
            
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
    }else{
      this.getProducts()
    }

    if(idBranch != "" && category != ""){
      console.log("ambos")
      this.branch$.getAllBranch().pipe(
        switchMap(branches => {
    
          return this.$product.getAllProduts().pipe(
          
            map(
              productList=> {


               let productListAux = productList.filter(prduct=>{
                  return prduct.productCategory === category;
                })

                productListAux = productListAux.filter(
                  product => {
                    return product.branchId === idBranch;
                  }
                );
    
                let productListAux2: Product[] = []; 
    
                productListAux.forEach(prduct=>{
                  branches.forEach(branch=>{
                    if (prduct.branchId == branch.branchId) {
                    
                        prduct.nameBranch = branch.branchName;
                    }
                  })
                  productListAux2.push(prduct);
                })
    
                return productListAux2;
    
              }
            )
          );
        })
       ).subscribe(
        {
          next: (listProduts: Product[]) => {
            this.products = listProduts;
            
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

  getProductsByIdBranch(idbranch: string){
    this.$product.getAllProduts().pipe(
      map((products) =>{ 
    
       return products.filter((product) => {
      
         return product.branchId === idbranch
       }
      
       )

      })
    ).subscribe((listProducts)=>{
     if(listProducts.length === 0){
      this.products = [];
      this.toastr$.warning('Al parecer aún no se han asignado productos a esta sucursal. Contacta con un administrador');
     }else{
      this.products = listProducts;
     }
      

  
      
      
    }
     
    )
  }

 getProducts() {

   this.branch$.getAllBranch().pipe(
    switchMap(branches => {

      return this.$product.getAllProduts().pipe(
        map(
          productList=> {

            let productListAux: Product[] = []; 

            productList.forEach(prduct=>{
              branches.forEach(branch=>{
                if (prduct.branchId == branch.branchId) {
                
                    prduct.nameBranch = branch.branchName;
                }
              })
              productListAux.push(prduct);
            })

            return productListAux;

          }
        )
      );
    })
   ).subscribe(
    {
      next: (listProduts: Product[]) => {
        this.products = listProduts;
        
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

  getBranchs(){
  
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
        complete: () => {  },
      }
    );
  }

}
