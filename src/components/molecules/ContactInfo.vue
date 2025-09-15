<template>
  <div class="contact-info">
    <BaseHeading v-if="title" tag="h3" class="contact-info__title">
      {{ title }}
    </BaseHeading>

    <div class="contact-info__items">
      <a v-if="email" :href="`mailto:${email}`" class="contact-info__item">
        <BaseIcon icon="📧" size="small" />
        <span>{{ email }}</span>
      </a>

      <a v-if="phone" :href="`tel:${phone}`" class="contact-info__item">
        <BaseIcon icon="📱" size="small" />
        <span>{{ phone }}</span>
      </a>

      <a
        v-if="website"
        :href="website"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-info__item"
      >
        <BaseIcon icon="🌐" size="small" />
        <span>{{ websiteDisplay }}</span>
      </a>

      <div v-if="location" class="contact-info__item">
        <BaseIcon icon="📍" size="small" />
        <span>{{ location }}</span>
      </div>

      <div v-if="socialLinks && socialLinks.length > 0" class="contact-info__social">
        <a
          v-for="social in socialLinks"
          :key="social.platform"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-info__social-link"
          :title="social.platform"
        >
          <BaseIcon :icon="social.icon || '🔗'" size="medium" />
        </a>
      </div>
    </div>

    <div v-if="$slots.extra" class="contact-info__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'

interface SocialLink {
  platform: string
  url: string
  icon?: string
}

interface ContactInfoProps {
  title?: string
  email?: string
  phone?: string
  website?: string
  location?: string
  socialLinks?: SocialLink[]
}

const props = defineProps<ContactInfoProps>()

const websiteDisplay = computed(() => {
  if (!props.website) return ''
  return props.website.replace(/^https?:\/\//, '').replace(/\/$/, '')
})
</script>

<style lang="scss" scoped>
.contact-info {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__title {
    margin-bottom: 16px;
    color: #333;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #007bff;
    }
  }

  &__social {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f0f0f0;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background-color: #e0e0e0;
      transform: translateY(-2px);
    }
  }

  &__extra {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
  }
}
</style>
