import type { Product, ProductCategory } from '~/types'

export async function useProductStore() {
  const nuxtApp = useNuxtApp()

  const { data: products } = await useAsyncData(
    'all-products',
    () => $fetch<Product[]>('/api/products'),
    {
      default: () => [] as Product[],
      getCachedData: (key) =>
        nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
    },
  )

  function getByCategory(category?: ProductCategory): Product[] {
    if (!category) return products.value
    return products.value.filter((p) => p.category === category)
  }

  function getBySlug(slug: string): Product | null {
    return products.value.find((p) => p.slug === slug) ?? null
  }

  function getFeatured(count = 4): Product[] {
    return products.value.slice(0, count)
  }

  async function refresh() {
    nuxtApp.payload.data['all-products'] = undefined
    products.value = await $fetch<Product[]>('/api/products')
  }

  return {
    products,
    getByCategory,
    getBySlug,
    getFeatured,
    refresh,
  }
}
