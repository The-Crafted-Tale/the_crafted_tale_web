<template>
  <section class="testimonials">
    <div class="testimonials__inner">
      <span class="section-label">LOVE NOTES</span>
      <h2 class="section-title">
        What Our
        <span class="section-title__accent">Customers</span>
        Say
      </h2>
      <div class="testimonials__grid">
        <div v-for="review in reviews" :key="review.name" class="review-card">
          <div class="review-card__stars" role="img" :aria-label="`${review.rating} out of 5 stars`">
            <Icon v-for="n in 5" :key="n" name="mdi:star" size="1rem" class="review-card__star" aria-hidden="true" />
          </div>
          <Icon name="mdi:format-quote-open" size="2rem" class="review-card__quote-icon" aria-hidden="true" />
          <p class="review-card__text">{{ review.text }}</p>
          <div class="review-card__author">
            <div class="review-card__avatar" aria-hidden="true">
              {{ review.name[0] }}
            </div>
            <div>
              <p class="review-card__name">{{ review.name }}</p>
              <p class="review-card__location">{{ review.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const reviews = [
  {
    name: 'Priya Sharma',
    location: 'Hyderabad',
    rating: 5,
    text: 'Absolutely loved the wedding invitation! The attention to detail was incredible. My guests were amazed by the craftsmanship.',
  },
  {
    name: 'Rahul Mehta',
    location: 'Mumbai',
    rating: 5,
    text: 'Ordered a personalized gift box for our anniversary. My wife was in tears — it was so thoughtful and beautifully made.',
  },
  {
    name: 'Ananya Reddy',
    location: 'Bangalore',
    rating: 5,
    text: "The Crafted Tale truly puts love into every piece. The handmade bouquet box was stunning and made my mom's birthday unforgettable.",
  },
]
</script>

<style lang="scss" scoped>
.testimonials {
  padding: 5rem 1.5rem;
  text-align: center;
  background: $brand-bg-blush;

  &__inner {
    max-width: 72rem;
    margin: 0 auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2.5rem;

    @include tablet-down {
      grid-template-columns: 1fr;
    }
  }
}

.review-card {
  background: #fff;
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  text-align: left;
  box-shadow: 0 0.125rem 0.75rem rgba($brand-red-dark, 0.06);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0.5rem 1.5rem rgba($brand-red-dark, 0.12);
  }

  &__stars {
    display: flex;
    gap: 0.125rem;
    margin-bottom: 1rem;
  }

  &__star {
    color: #e8b730;
  }

  &__quote-icon {
    color: rgba($brand-rose, 0.2);
    margin-bottom: 0.5rem;
  }

  &__text {
    font-size: 0.9375rem;
    color: $text-secondary;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  &__author {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__avatar {
    width: 2.75rem;
    height: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, $brand-rose, $brand-red-dark);
    color: #fff;
    font-family: $font-display;
    font-size: 1.125rem;
    font-weight: 700;
    border-radius: 50%;
  }

  &__name {
    font-family: $font-body;
    font-size: 0.9375rem;
    font-weight: 600;
    color: $text-primary;
    margin: 0;
  }

  &__location {
    font-size: 0.8125rem;
    color: $text-muted;
    margin: 0;
  }
}
</style>
