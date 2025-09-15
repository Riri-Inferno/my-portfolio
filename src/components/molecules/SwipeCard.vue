<template>
  <div
    ref="cardRef"
    :class="[
      'swipe-card',
      {
        'swipe-card--dragging': isDragging,
        'swipe-card--swiped': isSwiped,
      },
    ]"
    :style="cardStyle"
    @mousedown="handleStart"
    @touchstart="handleStart"
  >
    <div class="swipe-card__content">
      <slot />
    </div>

    <!-- スワイプ方向のインジケーター -->
    <Transition name="indicator">
      <div
        v-if="isDragging && Math.abs(offsetX) > 50"
        :class="[
          'swipe-card__indicator',
          offsetX > 0 ? 'swipe-card__indicator--like' : 'swipe-card__indicator--nope',
        ]"
      >
        <span>{{ offsetX > 0 ? 'LIKE' : 'NOPE' }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

interface SwipeCardProps {
  threshold?: number
  maxRotation?: number
}

interface SwipeCardEmits {
  (e: 'swipe', direction: 'left' | 'right'): void
  (e: 'swiping', progress: number): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<SwipeCardProps>(), {
  threshold: 100,
  maxRotation: 20,
})

const emit = defineEmits<SwipeCardEmits>()

const cardRef = ref<HTMLElement>()
const isDragging = ref(false)
const isSwiped = ref(false)
const startX = ref(0)
const startY = ref(0)
const offsetX = ref(0)
const offsetY = ref(0)

const cardStyle = computed(() => {
  const rotation = (offsetX.value / props.threshold) * props.maxRotation
  const opacity = isSwiped.value ? 0 : 1

  return {
    transform: `translate(${offsetX.value}px, ${offsetY.value}px) rotate(${rotation}deg)`,
    opacity: opacity,
    transition: isDragging.value ? 'none' : 'all 0.3s ease',
  }
})

const handleStart = (e: MouseEvent | TouchEvent) => {
  if (isSwiped.value) return

  isDragging.value = true

  const touch = e.type.includes('touch') ? (e as TouchEvent).touches[0] : (e as MouseEvent)
  startX.value = touch.clientX
  startY.value = touch.clientY

  document.addEventListener('mousemove', handleMove)
  document.addEventListener('touchmove', handleMove)
  document.addEventListener('mouseup', handleEnd)
  document.addEventListener('touchend', handleEnd)
}

const handleMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  const touch = e.type.includes('touch') ? (e as TouchEvent).touches[0] : (e as MouseEvent)
  offsetX.value = touch.clientX - startX.value
  offsetY.value = touch.clientY - startY.value

  const progress = Math.abs(offsetX.value) / props.threshold
  emit('swiping', Math.min(progress, 1))
}

const handleEnd = () => {
  if (!isDragging.value) return

  isDragging.value = false

  if (Math.abs(offsetX.value) > props.threshold) {
    // スワイプ完了
    isSwiped.value = true
    const direction = offsetX.value > 0 ? 'right' : 'left'
    offsetX.value = offsetX.value > 0 ? window.innerWidth : -window.innerWidth
    emit('swipe', direction)
  } else {
    // キャンセル
    offsetX.value = 0
    offsetY.value = 0
    emit('cancel')
  }

  cleanup()
}

const cleanup = () => {
  document.removeEventListener('mousemove', handleMove)
  document.removeEventListener('touchmove', handleMove)
  document.removeEventListener('mouseup', handleEnd)
  document.removeEventListener('touchend', handleEnd)
}

const reset = () => {
  isSwiped.value = false
  offsetX.value = 0
  offsetY.value = 0
}

onUnmounted(() => {
  cleanup()
})

defineExpose({
  reset,
})
</script>

<style lang="scss" scoped>
.swipe-card {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: grab;
  user-select: none;

  &--dragging {
    cursor: grabbing;
  }

  &--swiped {
    pointer-events: none;
  }

  &__content {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  &__indicator {
    position: absolute;
    top: 50px;
    padding: 10px 30px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 32px;
    transform: rotate(-30deg);
    pointer-events: none;

    &--like {
      right: 20px;
      color: #4fc3f7;
      border: 4px solid #4fc3f7;
      transform: rotate(30deg);
    }

    &--nope {
      left: 20px;
      color: #ff6b6b;
      border: 4px solid #ff6b6b;
    }
  }
}

.indicator-enter-active,
.indicator-leave-active {
  transition: opacity 0.2s ease;
}

.indicator-enter-from,
.indicator-leave-to {
  opacity: 0;
}
</style>
