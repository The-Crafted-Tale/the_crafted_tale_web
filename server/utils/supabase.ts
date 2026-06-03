import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let _client: SupabaseClient | null = null

export const useSupabaseServer = (): SupabaseClient => {

   if (_client) {

      return _client

   }

   const { supabaseUrl, supabaseServiceRoleKey } = useRuntimeConfig()

   if (!supabaseUrl || !supabaseServiceRoleKey) {

      throw new Error(
         "Missing NUXT_SUPABASE_URL or NUXT_SUPABASE_SERVICE_ROLE_KEY environment variables",
      )

   }

   _client = createClient(supabaseUrl, supabaseServiceRoleKey)

   return _client

}
