<template>
  <div class="progress-wrapper">
    <div v-if="label || showValue" class="progress-header">
      <span v-if="label" class="progress-label">{{ label }}</span>
      <span v-if="showValue" class="progress-value">{{ displayValue }}</span>
    </div>

    <div class="progress" :style="{ height: `${height}px` }">
      <div
        :class="[
          'progress__bar',
          `progress__bar--${variant}`,
          {
            'progress__bar--striped': striped,
            'progress__bar--animated': animated,
          },
        ]"
        :style="{ width: `${normalizedValue}%` }"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemin="min"
        :aria-valuemax="max"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ProgressBarProps {
  value: number
  min?: number
  max?: number
  label?: string
  height?: number
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  striped?: boolean
  animated?: boolean
  showValue?: boolean
  valueFormat?: 'percent' | 'fraction' | 'custom'
  customFormat?: (value: number, min: number, max: number) => string
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  min: 0,
  max: 100,
  height: 8,
  variant: 'primary',
  striped: false,
  animated: false,
  showValue: false,
  valueFormat: 'percent',
})

const normalizedValue = computed(() => {
  const range = props.max - props.min
  const normalized = ((props.value - props.min) / range) * 100
  return Math.min(Math.max(normalized, 0), 100)
})

const displayValue = computed(() => {
  if (props.customFormat) {
    return props.customFormat(props.value, props.min, props.max)
  }

  switch (props.valueFormat) {
    case 'percent':
      return `${Math.round(normalizedValue.value)}%`
    case 'fraction':
      return `${props.value}/${props.max}`
    default:
      return `${props.value}`
  }
})
</script>

<style lang="scss" scoped>
.progress-wrapper {
  width: 100%;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.progress-value {
  font-size: 14px;
  color: #666;
}

.progress {
  width: 100%;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;

  &__bar {
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 4px;

    // バリアント
    &--primary {
      background-color: #007bff;
    }

    &--secondary {
      background-color: #6c757d;
    }

    &--success {
      background-color: #28a745;
    }

    &--warning {
      background-color: #ffc107;
    }

    &--danger {
      background-color: #dc3545;
    }

    &--info {
      background-color: #17a2b8;
    }

    // ストライプ
    &--striped {
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
    }

    // アニメーション
    &--animated {
      animation: progress-bar-stripes 1s linear infinite;
    }
  }
}

@keyframes progress-bar-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>
