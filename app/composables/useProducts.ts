import type { Product, ProductCategory } from "~/types"

interface IUseProductStore {
  products: Ref<Product[]>
  getByCategory: (category?: ProductCategory) => Product[]
  getBySlug: (slug: string) => Product | null
  getFeatured: (count?: number) => Product[]
  refresh: () => Promise<void>
}

export const useProductStore = async (): Promise<IUseProductStore> => {

  const nuxtApp = useNuxtApp()

  const { data: products } = await useAsyncData(
    "all-products",
    () => $fetch<Product[]>("/api/products"),
    {
      default: () => [] as Product[],
      getCachedData: (key) =>
        nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
    },
  )

  const getByCategory = (category?: ProductCategory): Product[] => {

    if (!category) {

      return products.value

    }

    return products.value.filter((p) => p.category === category)

  }

  const getBySlug = (slug: string): Product | null => products.value.find((p) => p.slug === slug) ?? null

  const getFeatured = (count = 4): Product[] => products.value.slice(0, count)

  const refresh = async (): Promise<void> => {

    nuxtApp.payload.data["all-products"] = undefined
    products.value = await $fetch<Product[]>("/api/products")

  }

  return {
    products,
    getByCategory,
    getBySlug,
    getFeatured,
    refresh,
  }

}
