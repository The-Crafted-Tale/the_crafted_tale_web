export type ProductCategory = "custom" | "semi_custom" | "ready_made"

export interface Product {
   id?: string
   name: string
   slug: string
   description?: string
   price: number
   category: ProductCategory
   images: string[]
   display_order?: number
}
