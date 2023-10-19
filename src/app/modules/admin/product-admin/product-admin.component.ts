import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { BodyAddProduct, Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { Branch } from 'src/app/interfaces/Branchs';
import { BranchService } from 'src/app/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit, OnDestroy {

  products: Product[];
  branchs: Branch[];
  formAddProduct: FormGroup;
  subscriptionToAddProduct!: Subscription;
  subscriptionToMoveProduct!: Subscription;
  excelData: BodyAddProduct[];
  idSelectedBranch: string;
  idSelectedBranchModal: string;
  


 

  constructor(private $product: ProductService, private $formBuilder: FormBuilder, 
    private $websocket: WebsocketService, private $branch: BranchService, 
    private toastr$: ToastrService, private router$: Router) {
  
    this.products = [];
    this.branchs = [];
    this.excelData = [];
    this.idSelectedBranch = "";
    this.idSelectedBranchModal = "";
   
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
    
    this.getBranchs();

    if(this.branchs.length === 0){
      this.toastr$.warning('No se ha seleccionado sucursal');
    }

    this.formAddProduct.get('branchId')?.valueChanges.subscribe(

      {
        next: (branchId: string) => {
        
            if (branchId) {
              this.idSelectedBranch = branchId
              this.getProductsByIdBranch(branchId);
          
            
            } 
    
        
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
    

    this.subscriptionToAddProduct = this.$websocket.initializeWebSocketConnection("productAdded").subscribe(
      (product) => {
        this.products.push(product);
       
  
      }
    );

    this.subscriptionToMoveProduct = this.$websocket.initializeWebSocketConnection("productMoved").subscribe(
      (product)=>{
        //products
        //let productAux = this.products.filter(p => product.idProduct !== p.productId)
        this.getProductsByIdBranch(this.idSelectedBranch);
    
        console.log(product.branchId)
      }
    );
   
  }

  ngOnDestroy(): void {
      this.subscriptionToAddProduct.unsubscribe();
      this.subscriptionToMoveProduct.unsubscribe();
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

  addFromExcel(event: any){
    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsBinaryString(file);

    fileReader.onload = ()=>{
      var workBook = XLSX.read(fileReader.result, {type:'binary'});
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      this.excelData.forEach(data=>{
   
        this.$product.addProduct(data).subscribe(
          {
            next: (product) => {
              console.log(product);
            },
            error: (e) => {
              if(e.error === 'JWTExpired'){
                localStorage.removeItem("token");
                this.toastr$.error('Sesión expirada');
                this.router$.navigate(['/login']);
              }else{
                this.toastr$.error("No se pudo cargar el archivo, verifique estructura");
              }
            },
            complete: () => { },
          }
        );
      })

   
    }

console.log()
  }

  getBranchs() {
    this.$branch.getAllBranch().subscribe(
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

  getProducts() {
    this.$product.getAllProduts().subscribe(
      {
        next: (listProduts) => {
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

 


  funciondePrueba(){
    console.log(this.formAddProduct.value.branchId)
    
  }


}
