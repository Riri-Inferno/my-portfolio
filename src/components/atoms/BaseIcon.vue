<!-- src/components/atoms/BaseIcon.vue -->
<template>
  <span
    :class="[
      'icon',
      `icon--${size}`,
      {
        'icon--clickable': clickable,
        'icon--spin': spin,
      },
    ]"
    :style="{ color: color }"
    @click="handleClick"
  >
    <slot>
      {{ icon }}
    </slot>
  </span>
</template>

<script setup lang="ts">
interface IconProps {
  icon?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  color?: string
  clickable?: boolean
  spin?: boolean
}

interface IconEmits {
  (e: 'click', event: MouseEvent): void
}

withDefaults(defineProps<IconProps>(), {
  size: 'medium',
  clickable: false,
  spin: false,
})

const emit = defineEmits<IconEmits>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: all 0.2s ease;

  // サイズ
  &--small {
    font-size: 16px;
    width: 16px;
    height: 16px;
  }

  &--medium {
    font-size: 24px;
    width: 24px;
    height: 24px;
  }

  &--large {
    font-size: 32px;
    width: 32px;
    height: 32px;
  }

  &--xlarge {
    font-size: 48px;
    width: 48px;
    height: 48px;
  }

  // クリック可能
  &--clickable {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  // 回転アニメーション
  &--spin {
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
