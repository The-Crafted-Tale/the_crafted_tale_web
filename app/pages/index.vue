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

useSeoMeta({
  title: 'The Crafted Tale — Handmade Gifts, Delivered with Love',
  description:
    'Discover bespoke handmade gifts for every occasion. Custom, semi-custom, and ready-made creations crafted with love and delivered with care.',
  ogTitle: 'The Crafted Tale — Handmade Gifts, Delivered with Love',
  ogDescription:
    'Discover bespoke handmade gifts for every occasion. Custom, semi-custom, and ready-made creations crafted with love and delivered with care.',
  ogUrl: url.href,
  twitterTitle: 'The Crafted Tale — Handmade Gifts, Delivered with Love',
  twitterDescription:
    'Discover bespoke handmade gifts for every occasion. Custom, semi-custom, and ready-made creations crafted with love and delivered with care.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'The Crafted Tale',
        'url': url.origin,
        'logo': `${url.origin}/favicon.ico`,
        'description':
          'Discover bespoke handmade gifts for every occasion. Custom, semi-custom, and ready-made creations crafted with love and delivered with care.',
        'email': contact.email,
        'telephone': contact.phone,
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': contact.phone,
          'contactType': 'customer service',
          'email': contact.email,
        },
        'sameAs': [contact.instagram, contact.facebook, contact.youtube],
      }),
    },
  ],
})

const { getFeatured } = await useProductStore()

const featuredProducts = computed(() => getFeatured(4))
</script>
