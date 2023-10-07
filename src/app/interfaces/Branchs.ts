export interface BodyAddBranch {
    branchName: string
    branchCountry: string
    branchCity: string
  }

  export interface Branch {
    branchId: string
    branchName: string
    branchCountry: string
    branchCity: string
  }

  export type Branchs = Branch[]