<template>
  <div v-if="product" class="product-detail">
    <div class="product-detail__inner">
      <nav class="product-detail__breadcrumb" aria-label="Breadcrumb">
        <NuxtLink to="/">Home</NuxtLink>
        <Icon name="mdi:chevron-right" size="1rem" />
        <NuxtLink to="/products">Products</NuxtLink>
        <Icon name="mdi:chevron-right" size="1rem" />
        <span aria-current="page">{{ product.name }}</span>
      </nav>

      <div class="product-detail__main">
        <div class="product-detail__gallery">
          <ImageGallery :images="product.images" :alt="product.name" />
        </div>

        <div class="product-detail__info">
          <CategoryBadge :category="product.category" />
          <h1 class="product-detail__name">{{ product.name }}</h1>
          <PriceTag :amount="product.price" class="product-detail__price" />
          <p class="product-detail__desc">{{ product.description }}</p>

          <div class="product-detail__actions">
            <AppButton variant="gold" size="lg" :href="whatsappUrl">
              <Icon name="mdi:whatsapp" size="1.25rem" />
              Message on WhatsApp
            </AppButton>
            <AppButton variant="primary" size="lg" :href="`/contact?product=${product.slug}`">
              <Icon name="mdi:email-outline" size="1.125rem" />
              Send Inquiry
            </AppButton>
          </div>

          <div class="product-detail__assurance">
            <span class="product-detail__assurance-item">
              <Icon name="mdi:hand-heart" size="1rem" />
              100% Handmade
            </span>
            <span class="product-detail__assurance-item">
              <Icon name="mdi:truck-delivery-outline" size="1rem" />
              Careful Packaging
            </span>
            <span class="product-detail__assurance-item">
              <Icon name="mdi:palette-outline" size="1rem" />
              Customizable
            </span>
          </div>
        </div>
      </div>
    </div>

    <section v-if="relatedProducts.length" class="product-detail__related">
      <div class="product-detail__related-inner">
        <span class="section-label">YOU MAY ALSO LIKE</span>
        <h2 class="section-title">
          More
          <span class="section-title__accent">Treasures</span>
        </h2>
        <div class="product-detail__related-grid">
          <ProductCard v-for="related in relatedProducts" :key="related.slug" :product="related" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { getBySlug, getByCategory } = await useProductStore()

const product = computed(() => getBySlug(slug))

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  })
}

const url = useRequestURL()
const productDescription =
  product.value.description ??
  `Explore ${product.value.name} — a handcrafted creation from The Crafted Tale.`

useSeoMeta({
  title: `${product.value.name} | The Crafted Tale`,
  description: productDescription,
  ogTitle: `${product.value.name} | The Crafted Tale`,
  ogDescription: productDescription,
  ogUrl: url.href,
  ogImage: product.value.images[0],
  twitterTitle: `${product.value.name} | The Crafted Tale`,
  twitterDescription: productDescription,
  twitterImage: product.value.images[0],
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.value.name,
        'description': productDescription,
        'image': product.value.images,
        'url': url.href,
        'brand': {
          '@type': 'Brand',
          'name': 'The Crafted Tale',
        },
        'offers': {
          '@type': 'Offer',
          'price': product.value.price,
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock',
          'url': url.href,
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': url.origin,
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Products',
            'item': `${url.origin}/products`,
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': product.value.name,
            'item': url.href,
          },
        ],
      }),
    },
  ],
})

const contact = useContactInfo()

const whatsappUrl = computed(() =>
  contact.whatsappUrlWithMessage(`Hi, I'm interested in "${product.value?.name}". Can you tell me more?`),
)

const relatedProducts = computed(() =>
  getByCategory(product.value?.category)
    .filter((p) => p.slug !== slug)
    .slice(0, 4),
)
</script>

<style lang="scss" scoped>
.product-detail {
  &__inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }

  &__breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-family: $font-body;
    font-size: 0.8125rem;
    color: $text-muted;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;

    a {
      color: $text-muted;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: $brand-rose;
      }
    }

    span[aria-current] {
      color: $text-primary;
      font-weight: 600;
    }
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5rem;
    align-items: start;

    @include tablet-down {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  &__gallery {
    position: sticky;
    top: 6rem;

    @include tablet-down {
      position: static;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__name {
    font-family: $font-display;
    font-size: 2rem;
    font-weight: 700;
    color: $text-primary;
    line-height: 1.25;
    margin: 0;

    @include mobile {
      font-size: 1.5rem;
    }
  }

  &__price {
    font-size: 1.25rem;
  }

  &__desc {
    font-size: 1rem;
    color: $text-secondary;
    line-height: 1.8;
    margin-top: 0.5rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  &__assurance {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid $border;
  }

  &__assurance-item {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-family: $font-body;
    font-size: 0.8125rem;
    font-weight: 600;
    color: $text-muted;
  }

  &__related {
    padding: 4rem 1.5rem 5rem;
    background: $brand-bg-blush;
    text-align: center;
  }

  &__related-inner {
    max-width: 72rem;
    margin: 0 auto;
  }

  &__related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 2rem;
    margin-top: 2rem;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }
}
</style>
