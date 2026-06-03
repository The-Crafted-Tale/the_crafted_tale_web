export default defineSitemapEventHandler(async () => {

  const supabase = useSupabaseServer()

  const { data } = await supabase
    .from("product")
    .select("slug, updated_at")
    .eq("is_active", true)
    .order("display_order")

  return (data ?? []).map((product) =>
    asSitemapUrl({
      loc: `/products/${product.slug}`,
      lastmod: product.updated_at,
      changefreq: "weekly",
      priority: 0.8,
    }),
  )

})
