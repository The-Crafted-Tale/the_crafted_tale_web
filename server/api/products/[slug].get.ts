import { useSupabaseServer } from "~~/server/utils/supabase"
import { normalizeCategory } from "../../utils/category"

export default defineEventHandler(async (event) => {

   const slug = getRouterParam(event, "slug")

   if (!slug) {

      throw createError({ statusCode: 400, statusMessage: "Slug is required" })

   }

   const supabase = useSupabaseServer()

   const { data, error } = await supabase
      .from("product")
      .select("id, name, slug, description, price, category, images, display_order")
      .eq("slug", slug)
      .eq("is_active", true)
      .single()

   if (error || !data) {

      throw createError({ statusCode: 404, statusMessage: "Product not found" })

   }

   return {
      ...data,
      category: normalizeCategory(data.category),
   }

})
