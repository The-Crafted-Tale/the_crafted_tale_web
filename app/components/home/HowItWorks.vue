<template>
  <section class="how-it-works">
    <FloatingHearts :count="10" />
    <div class="how-it-works__inner">
      <span class="section-label section-label--light">SIMPLE PROCESS</span>
      <h2 class="section-title section-title--light">
        How It
        <span class="section-title__accent">Works</span>
      </h2>
      <div class="how-it-works__steps">
        <div
          v-for="(step, idx) in steps"
          :key="step.title"
          class="step"
        >
          <div class="step__icon-wrap">
            <Icon
              :name="step.icon"
              size="1.75rem"
              class="step__icon"
            />
            <span class="step__number">{{ idx + 1 }}</span>
          </div>
          <h3 class="step__title">{{ step.title }}</h3>
          <p class="step__desc">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    icon: 'mdi:heart-outline',
    title: 'Choose Your Gift',
    desc: 'Browse our handcrafted collection and pick the perfect piece for your loved one.',
  },
  {
    icon: 'mdi:pencil-outline',
    title: 'Personalize It',
    desc: 'Add your personal touch — names, messages, photos, and special details.',
  },
  {
    icon: 'mdi:gift-outline',
    title: 'We Deliver with Love',
    desc: 'We craft your gift by hand and deliver it beautifully packaged to your doorstep.',
  },
]
</script>

<style lang="scss" scoped>
.how-it-works {
  position: relative;
  padding: 5rem 1.5rem;
  text-align: center;
  background: radial-gradient(
    ellipse at center,
    $brand-crimson 0%,
    $brand-crimson-dark 60%,
    $brand-maroon 100%
  );
  overflow: hidden;

  &__inner {
    position: relative;
    z-index: 1;
    max-width: 64rem;
    margin: 0 auto;
  }

  &__steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    margin-top: 2.5rem;

    @include tablet-down {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &__icon-wrap {
    position: relative;
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  }

  &__icon {
    color: $brand-gold;
  }

  &__number {
    position: absolute;
    top: -0.375rem;
    right: -0.375rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $brand-gold;
    color: $brand-crimson-dark;
    font-family: $font-body;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 50%;
  }

  &__title {
    font-family: $font-body;
    font-size: 1.125rem;
    font-weight: 600;
    color: #fff;
  }

  &__desc {
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;
    max-width: 18rem;
  }
}
</style>
