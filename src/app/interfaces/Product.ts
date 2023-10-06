export interface Product {
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

  export type Products = Product[]