<template>
  <div class="home">
    <HomeHeroSection />
    <HomeFeaturedProducts :products="featuredProducts" />
    <HomeHowItWorks />
    <HomeOurStory />
    <HomeTestimonials />
    <HomeCtaBanner />
  </div>
</template>

<script setup lang="ts">
const url = useRequestURL()

const contact = useContactInfo()

const homeDescription
  = 'Shop bespoke handmade gifts for weddings, birthdays, festivals & every special occasion. Custom, semi-custom & ready-made creations crafted with love in India.'

useSeoMeta({
  title: 'The Crafted Tale — Handmade Gifts, Delivered with Love',
  description: homeDescription,
  keywords: 'handmade gifts India, personalized gifts, custom gift boxes, bespoke gifts, handcrafted keepsakes, wedding gifts India, birthday gifts handmade, The Crafted Tale',
  ogTitle: 'The Crafted Tale — Handmade Gifts, Delivered with Love',
  ogDescription: homeDescription,
  ogUrl: url.href,
  twitterTitle: 'The Crafted Tale — Handmade Gifts, Delivered with Love',
  twitterDescription: homeDescription,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['Organization', 'Store'],
        'name': 'The Crafted Tale',
        'url': url.origin,
        'logo': {
          '@type': 'ImageObject',
          'url': `${url.origin}/og-image.png`,
          'width': 1200,
          'height': 630,
        },
        'image': `${url.origin}/og-image.png`,
        'description': 'Bespoke handmade gifts for every occasion — custom, semi-custom, and ready-made creations crafted with love and delivered with care across India.',
        'email': contact.email,
        'telephone': contact.phone,
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'IN',
        },
        'areaServed': 'IN',
        'priceRange': '₹₹',
        'currenciesAccepted': 'INR',
        'paymentAccepted': 'Cash, UPI, Bank Transfer',
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': contact.phone,
          'contactType': 'customer service',
          'email': contact.email,
          'availableLanguage': ['English', 'Hindi'],
        },
        'sameAs': [contact.instagram, contact.facebook, contact.youtube],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'The Crafted Tale',
        'url': url.origin,
        'description': 'Bespoke handmade gifts crafted with love — custom, semi-custom, and ready-made creations for every occasion.',
        'inLanguage': 'en-IN',
      }),
    },
  ],
})

const { getFeatured } = await useProductStore()

const featuredProducts = computed(() => getFeatured(4))
</script>
