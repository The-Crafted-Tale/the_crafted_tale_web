import { normalizeCategory, categoryDbValues } from "../utils/category"
import { useSupabaseServer } from "../utils/supabase"

export default defineEventHandler(async (event) => {

   const { category } = getQuery<{ category?: string }>(event)

   const supabase = useSupabaseServer()

   let query = supabase
      .from("product")
      .select("id, name, slug, description, price, category, images, display_order")
      .eq("is_active", true)
      .order("display_order")

   if (category) {

      query = query.in("category", categoryDbValues(category))

   }

   const { data, error } = await query

   if (error) {

      throw createError({
         statusCode: 500,
         statusMessage: "Failed to fetch products",
      })

   }

   return (data ?? []).map((p: { category: string }) => ({
      ...p,
      category: normalizeCategory(p.category),
   }))

})
