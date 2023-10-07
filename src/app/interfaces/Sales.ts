export interface Sale {
    branchId: string
    productSalesUtil: ProductSalesUtil[]
  }
  
  export interface ProductSalesUtil {
    productSaleId: string
    productSaleStock: number
  }

  export interface SaleDTO {
    branchName: string
    productName: string
    productPrice: number
    productSalePrice: number
    productSaleAmount: number
  }

  export type SalesDTO = SaleDTO[]