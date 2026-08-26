/** Google truncates meta descriptions past roughly this many characters. */
export const META_DESCRIPTION_MAX = 160

/**
 * Trims a description to something a search result can actually show, cutting on
 * a word boundary rather than mid-word. Product copy from Supabase runs to
 * several hundred characters, which is fine for structured data but wasted in a
 * `<meta name="description">`.
 */
export const toMetaDescription = (text: string, max: number = META_DESCRIPTION_MAX): string => {

  const normalized = text.replace(/\s+/g, " ").trim()

  if (normalized.length <= max) {

    return normalized

  }

  const cut = normalized.slice(0, max - 1)

  const lastSpace = cut.lastIndexOf(" ")

  // Cut at the last space, unless doing so would throw away more than half the
  // budget (a single very long word), in which case cut mid-word.
  const trimmed = lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut

  return `${trimmed.replace(/[,;:.\-\s]+$/, "")}…`

}
