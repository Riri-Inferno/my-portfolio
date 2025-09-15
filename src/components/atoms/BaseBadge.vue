<template>
  <span
    :class="[
      'badge',
      `badge--${variant}`,
      `badge--${position}`,
      {
        'badge--dot': dot,
        'badge--standalone': !$slots.default,
      },
    ]"
  >
    <span v-if="$slots.default" class="badge__content">
      <slot />
    </span>
    <span v-if="!dot && (count !== undefined || content)" class="badge__indicator">
      {{ displayContent }}
    </span>
    <span v-else-if="dot" class="badge__dot" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface BadgeProps {
  count?: number
  content?: string
  max?: number
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  dot?: boolean
  showZero?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
  max: 99,
  variant: 'danger',
  position: 'top-right',
  dot: false,
  showZero: false,
})

const displayContent = computed(() => {
  if (props.content) return props.content
  if (props.count === undefined) return ''
  if (props.count === 0 && !props.showZero) return ''
  return props.count > props.max ? `${props.max}+` : props.count.toString()
})
</script>

<style lang="scss" scoped>
.badge {
  position: relative;
  display: inline-flex;

  &__content {
    display: inline-flex;
  }

  &__indicator,
  &__dot {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(50%, -50%);
    z-index: 1;
  }

  &__indicator {
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    color: white;
    white-space: nowrap;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  // スタンドアロン（子要素なし）
  &--standalone {
    .badge__indicator {
      position: static;
      transform: none;
    }
  }

  // ポジション
  &--top-right {
    .badge__indicator,
    .badge__dot {
      top: 0;
      right: 0;
    }
  }

  &--top-left {
    .badge__indicator,
    .badge__dot {
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
    }
  }

  &--bottom-right {
    .badge__indicator,
    .badge__dot {
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }
  }

  &--bottom-left {
    .badge__indicator,
    .badge__dot {
      bottom: 0;
      left: 0;
      transform: translate(-50%, 50%);
    }
  }

  // バリアント
  &--primary {
    .badge__indicator,
    .badge__dot {
      background-color: #007bff;
    }
  }

  &--secondary {
    .badge__indicator,
    .badge__dot {
      background-color: #6c757d;
    }
  }

  &--success {
    .badge__indicator,
    .badge__dot {
      background-color: #28a745;
    }
  }

  &--warning {
    .badge__indicator,
    .badge__dot {
      background-color: #ffc107;
      color: #333;
    }
  }

  &--danger {
    .badge__indicator,
    .badge__dot {
      background-color: #dc3545;
    }
  }

  &--info {
    .badge__indicator,
    .badge__dot {
      background-color: #17a2b8;
    }
  }
}
</style>
