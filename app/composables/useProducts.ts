import type { Product, ProductCategory } from '~/types'

export function useProducts() {
  async function getAllProducts(category?: ProductCategory): Promise<Product[]> {
    return $fetch<Product[]>('/api/products', {
      query: category ? { category } : {},
    })
  }

  async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
      return await $fetch<Product>(`/api/products/${slug}`)
    } catch {
      return null
    }
  }

  async function getFeaturedProducts(count = 4): Promise<Product[]> {
    const products = await getAllProducts()
    return products.slice(0, count)
  }

  return { getAllProducts, getProductBySlug, getFeaturedProducts }
}
