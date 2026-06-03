import { useSupabaseServer } from "../utils/supabase"

export default defineEventHandler(async (event) => {

   const body = await readBody<{ email?: string }>(event)

   const email = body?.email?.trim().toLowerCase()

   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

      throw createError({ statusCode: 400, statusMessage: "A valid email is required" })

   }

   const supabase = useSupabaseServer()

   const { error } = await supabase.from("subscriber").upsert(
      { email, is_active: true },
      { onConflict: "email" },
   )

   if (error) {

      throw createError({ statusCode: 500, statusMessage: "Failed to subscribe" })

   }

   return { success: true }

})
