export interface Product {
    branchId: string
    productId: string
    productName: string
    productDescription: string
    productPrice: number
    productInventoryStock: number
    productCategory: string
  }

  export interface BodyAddProduct {
    branchId: string
    productName: string
    productDescription: string
    productPrice: number
    productInventoryStock: number
    productCategory: string
  }

  export interface BodyMoveProduct {
    idProduct: string
    branchId: string
  }

  export type Products = Product[]