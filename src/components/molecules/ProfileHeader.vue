<!-- src/components/molecules/ProfileHeader.vue -->
<template>
  <div class="profile-header">
    <div class="profile-header__avatar-section">
      <BaseAvatar
        :src="avatarUrl"
        :name="name"
        :size="avatarSize"
        :status="status"
        class="profile-header__avatar"
      />
      <BaseBadge
        v-if="verified"
        variant="success"
        position="bottom-right"
        class="profile-header__verified"
      >
        <BaseIcon icon="✓" size="small" color="white" />
      </BaseBadge>
    </div>

    <div class="profile-header__info">
      <BaseHeading :tag="headingTag" no-margin class="profile-header__name">
        {{ name }}
        <span v-if="age" class="profile-header__age">{{ age }}</span>
      </BaseHeading>

      <p v-if="title" class="profile-header__title">
        {{ title }}
      </p>

      <div v-if="location" class="profile-header__location">
        <BaseIcon icon="📍" size="small" />
        <span>{{ location }}</span>
      </div>

      <div v-if="tags && tags.length > 0" class="profile-header__tags">
        <BaseTag v-for="tag in tags" :key="tag" size="small" variant="primary">
          {{ tag }}
        </BaseTag>
      </div>

      <div v-if="$slots.actions" class="profile-header__actions">
        <slot name="actions" />
      </div>
    </div>

    <div v-if="$slots.extra" class="profile-header__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseAvatar from '@/components/atoms/BaseAvatar.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseTag from '@/components/atoms/BaseTag.vue'

interface ProfileHeaderProps {
  name: string
  avatarUrl?: string
  title?: string
  age?: number | string
  location?: string
  tags?: string[]
  status?: 'online' | 'offline' | 'busy' | 'away'
  verified?: boolean
  avatarSize?: 'small' | 'medium' | 'large' | 'xlarge'
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

withDefaults(defineProps<ProfileHeaderProps>(), {
  avatarSize: 'xlarge',
  headingTag: 'h2',
  verified: false,
})
</script>

<style lang="scss" scoped>
.profile-header {
  display: flex;
  gap: 24px;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__avatar-section {
    position: relative;
    flex-shrink: 0;
  }

  &__verified {
    position: absolute;
    bottom: 4px;
    right: 4px;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__name {
    display: flex;
    align-items: baseline;
    gap: 8px;
    color: #333;
  }

  &__age {
    font-size: 0.8em;
    font-weight: 400;
    color: #666;
  }

  &__title {
    margin: 0;
    font-size: 18px;
    color: #666;
  }

  &__location {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #888;
    font-size: 14px;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }

  &__actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  &__extra {
    flex-shrink: 0;
  }
}
</style>
