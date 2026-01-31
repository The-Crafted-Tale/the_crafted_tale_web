import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
        .from('waitlist')
        .insert({
            channel: body.channel,
            email: body.channel === 'email' ? body.value : null,
            whatsapp: body.channel === 'whatsapp' ? body.value : null,
        })

    // Treat duplicate email or WhatsApp as success (they're already on the waitlist)
    const isDuplicate =
        error?.code === '23505' ||
        (error?.message && /unique_waitlist_(email|whatsapp)/i.test(error.message))

    if (error && !isDuplicate) {
        throw createError({ statusCode: 400, statusMessage: error.message })
    }

    return { success: true }
})
