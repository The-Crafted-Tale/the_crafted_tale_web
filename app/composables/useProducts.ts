import type { Product, ProductCategory } from '~/types'

const catalog: Product[] = [
  {
    name: 'Royal Wedding Invitation',
    slug: 'royal-wedding-invitation',
    description:
      'An exquisite, hand-crafted wedding invitation adorned with gold leaf calligraphy and pressed flower details. Each piece is individually designed to capture the essence of your special day, featuring premium handmade paper and a custom wax seal. Perfect for couples who want their wedding stationery to be as unique as their love story.',
    price: 1299,
    category: 'custom',
    images: [
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=600&h=600&fit=crop',
    ],
    display_order: 1,
  },
  {
    name: 'Floral Gift Box',
    slug: 'floral-gift-box',
    description:
      "A beautifully arranged gift box featuring dried and preserved flowers, handmade paper fillers, and a personalized message card. Choose from our curated arrangements or tell us your loved one's favourite colours for a semi-custom touch. Ideal for birthdays, anniversaries, or a heartfelt surprise.",
    price: 899,
    category: 'semi_custom',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238f664?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=600&fit=crop',
    ],
    display_order: 2,
  },
  {
    name: 'Personalized Love Letter',
    slug: 'personalized-love-letter',
    description:
      "A beautifully hand-written love letter on premium parchment paper, sealed with wax and decorated with dried flowers. Each letter is penned with care in elegant calligraphy, making it a timeless keepsake. Perfect for anniversaries, Valentine's Day, or any moment that calls for heartfelt words.",
    price: 450,
    category: 'ready_made',
    images: [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
    ],
    display_order: 3,
  },
  {
    name: 'Handmade Bouquet Box',
    slug: 'handmade-bouquet-box',
    description:
      'A stunning gift box featuring a handcrafted paper flower bouquet that lasts forever. Each flower is individually shaped and coloured by hand, arranged in a luxurious box with satin ribbon. Fully customizable — choose your colours, flower types, and add a personal message.',
    price: 1599,
    category: 'custom',
    images: [
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=600&fit=crop',
    ],
    display_order: 4,
  },
  {
    name: 'Surprise Birthday Box',
    slug: 'surprise-birthday-box',
    description:
      'Make their birthday unforgettable with our curated surprise box. Includes a handmade greeting card, a small dried flower arrangement, artisan chocolates, and a personalised photo frame. Select from preset themes or tell us about the birthday person for a semi-custom experience.',
    price: 749,
    category: 'semi_custom',
    images: [
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
    ],
    display_order: 5,
  },
  {
    name: 'Memory Scrapbook',
    slug: 'memory-scrapbook',
    description:
      "A fully bespoke scrapbook designed around your memories. Send us your photos, ticket stubs, and stories — we'll transform them into a beautifully layered keepsake with hand-cut elements, washi tape borders, and heartfelt captions. Each page is a labour of love.",
    price: 1899,
    category: 'custom',
    images: [
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=600&h=600&fit=crop',
    ],
    display_order: 6,
  },
  {
    name: 'Greeting Card Set',
    slug: 'greeting-card-set',
    description:
      'A set of five hand-illustrated greeting cards, each featuring unique floral watercolour designs on textured cardstock. Comes with matching envelopes and wax seal stickers. Ready to send for birthdays, thank-yous, and thinking-of-you moments.',
    price: 299,
    category: 'ready_made',
    images: [
      'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528938102132-4a9276b8e320?w=600&h=600&fit=crop',
    ],
    display_order: 7,
  },
  {
    name: 'Festive Hamper',
    slug: 'festive-hamper',
    description:
      'Celebrate the season with our curated festive hamper, featuring handmade candles, artisan sweets, a dried flower wreath, and a personalised note card. Available in Diwali, Christmas, and Eid themes with colour and content customizations.',
    price: 999,
    category: 'semi_custom',
    images: [
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=600&h=600&fit=crop',
    ],
    display_order: 8,
  },
]

export function useProducts() {
  function getAllProducts(category?: ProductCategory): Product[] {
    const filtered = category
      ? catalog.filter((p) => p.category === category)
      : catalog
    return [...filtered].sort(
      (a, b) => (a.display_order ?? 99) - (b.display_order ?? 99),
    )
  }

  function getProductBySlug(slug: string): Product | undefined {
    return catalog.find((p) => p.slug === slug)
  }

  function getFeaturedProducts(count = 4): Product[] {
    return getAllProducts().slice(0, count)
  }

  return { getAllProducts, getProductBySlug, getFeaturedProducts }
}
