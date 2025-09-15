<template>
  <div
    :class="[
      'avatar',
      `avatar--${size}`,
      `avatar--${shape}`,
      {
        'avatar--clickable': clickable,
      },
    ]"
    @click="handleClick"
  >
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      class="avatar__image"
      @error="handleImageError"
    />
    <div v-else class="avatar__fallback">
      <slot name="fallback">
        {{ fallbackText }}
      </slot>
    </div>
    <div v-if="status" :class="['avatar__status', `avatar__status--${status}`]" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  shape?: 'circle' | 'square'
  status?: 'online' | 'offline' | 'busy' | 'away'
  clickable?: boolean
}

interface AvatarEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'error', event: Event): void
}

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: 'Avatar',
  size: 'medium',
  shape: 'circle',
  clickable: false,
})

const emit = defineEmits<AvatarEmits>()

const imageError = ref(false)

// 名前からイニシャルを生成
const fallbackText = computed(() => {
  if (!props.name) return '?'
  const names = props.name.split(' ')
  if (names.length >= 2) {
    return names[0][0] + names[names.length - 1][0]
  }
  return props.name.substring(0, 2).toUpperCase()
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}

const handleImageError = (event: Event) => {
  imageError.value = true
  emit('error', event)
}
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #e0e0e0;
  color: #666;
  font-weight: 600;
  user-select: none;

  // サイズ
  &--small {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  &--medium {
    width: 48px;
    height: 48px;
    font-size: 16px;
  }

  &--large {
    width: 64px;
    height: 64px;
    font-size: 20px;
  }

  &--xlarge {
    width: 96px;
    height: 96px;
    font-size: 32px;
  }

  // 形状
  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: 8px;
  }

  // クリック可能
  &--clickable {
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  // ステータスインジケーター
  &__status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
    height: 25%;
    border: 2px solid white;
    border-radius: 50%;

    &--online {
      background-color: #4caf50;
    }

    &--offline {
      background-color: #9e9e9e;
    }

    &--busy {
      background-color: #f44336;
    }

    &--away {
      background-color: #ff9800;
    }
  }
}
</style>
