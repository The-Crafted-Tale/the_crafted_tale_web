import { useSupabaseServer } from "../utils/supabase"

export default defineEventHandler(async (event) => {

   const body = await readBody<{
      name?: string
      email?: string
      phone?: string
      message?: string
   }>(event)

   if (!body?.name?.trim()) {

      throw createError({ statusCode: 400, statusMessage: "Name is required" })

   }

   if (!body?.message?.trim()) {

      throw createError({ statusCode: 400, statusMessage: "Message is required" })

   }

   if (!body.email?.trim() && !body.phone?.trim()) {

      throw createError({
         statusCode: 400,
         statusMessage: "At least one of email or phone is required",
      })

   }

   if (body.message.trim().length > 500) {

      throw createError({ statusCode: 400, statusMessage: "Message must be 500 characters or fewer" })

   }

   const supabase = useSupabaseServer()

   const { error } = await supabase.from("enquiry").insert({
      name: body.name.trim(),
      email: body.email?.trim() || null,
      phone: body.phone?.trim() || null,
      message: body.message.trim(),
   })

   if (error) {

      throw createError({
         statusCode: 500,
         statusMessage: "Failed to save message",
      })

   }

   return { success: true }

})
