<!-- src/components/organisms/SwipeableCardStack.vue -->
<template>
  <div class="card-stack">
    <div class="card-stack__container">
      <TransitionGroup name="card">
        <SwipeCard
          v-for="(card, index) in visibleCards"
          :key="card.id"
          :style="getCardStyle(index)"
          @swipe="handleSwipe(card, $event)"
          @swiping="handleSwiping"
          class="card-stack__card"
        >
          <slot :card="card" :index="index" />
        </SwipeCard>
      </TransitionGroup>

      <!-- 空の状態 -->
      <div v-if="visibleCards.length === 0" class="card-stack__empty">
        <slot name="empty">
          <BaseIcon icon="🎉" size="xlarge" />
          <p>カードがありません</p>
        </slot>
      </div>
    </div>

    <!-- アクションボタン -->
    <div v-if="showActions" class="card-stack__actions">
      <BaseButton
        variant="ghost"
        @click="handleRewind"
        :disabled="history.length === 0"
        class="card-stack__action"
      >
        <BaseIcon icon="↩️" size="large" />
      </BaseButton>

      <BaseButton
        variant="danger"
        @click="handleDislike"
        class="card-stack__action card-stack__action--nope"
      >
        <BaseIcon icon="❌" size="large" />
      </BaseButton>

      <BaseButton
        variant="primary"
        @click="handleSuperLike"
        class="card-stack__action card-stack__action--super"
      >
        <BaseIcon icon="⭐" size="large" />
      </BaseButton>

      <BaseButton
        variant="primary"
        @click="handleLike"
        class="card-stack__action card-stack__action--like"
      >
        <BaseIcon icon="❤️" size="large" />
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SwipeCard from '@/components/molecules/SwipeCard.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'

interface Card {
  id: string | number
  [key: string]: unknown
}

interface SwipeHistory {
  card: Card
  action: 'like' | 'nope' | 'superlike'
}

interface CardStackProps {
  cards: Card[]
  visibleCount?: number
  showActions?: boolean
}

interface CardStackEmits {
  (e: 'swipe', card: Card, direction: 'left' | 'right'): void
  (e: 'like', card: Card): void
  (e: 'nope', card: Card): void
  (e: 'superlike', card: Card): void
  (e: 'rewind', card: Card): void
}

const props = withDefaults(defineProps<CardStackProps>(), {
  visibleCount: 3,
  showActions: true,
})

const emit = defineEmits<CardStackEmits>()

const currentIndex = ref(0)
const history = ref<SwipeHistory[]>([])
const swipeProgress = ref(0)

const visibleCards = computed(() => {
  return props.cards.slice(currentIndex.value, currentIndex.value + props.visibleCount)
})

const getCardStyle = (index: number) => {
  const scale = 1 - index * 0.05
  const translateY = index * 10
  const zIndex = props.visibleCount - index

  return {
    transform: `scale(${scale}) translateY(${translateY}px)`,
    zIndex: zIndex,
  }
}

const handleSwipe = (card: Card, direction: 'left' | 'right') => {
  const action = direction === 'right' ? 'like' : 'nope'
  history.value.push({ card, action })
  currentIndex.value++

  emit('swipe', card, direction)
  if (action === 'like') {
    emit('like', card)
  } else {
    emit('nope', card)
  }
}

const handleSwiping = (progress: number) => {
  swipeProgress.value = progress
}

const handleLike = () => {
  if (visibleCards.value.length > 0) {
    const card = visibleCards.value[0]
    handleSwipe(card, 'right')
  }
}

const handleDislike = () => {
  if (visibleCards.value.length > 0) {
    const card = visibleCards.value[0]
    handleSwipe(card, 'left')
  }
}

const handleSuperLike = () => {
  if (visibleCards.value.length > 0) {
    const card = visibleCards.value[0]
    history.value.push({ card, action: 'superlike' })
    currentIndex.value++
    emit('superlike', card)
  }
}

const handleRewind = () => {
  if (history.value.length > 0) {
    const lastAction = history.value.pop()
    currentIndex.value--
    if (lastAction) {
      emit('rewind', lastAction.card)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-stack {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__container {
    flex: 1;
    position: relative;
    margin: 20px;
    min-height: 400px;
  }

  &__card {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;

    p {
      margin-top: 16px;
      font-size: 18px;
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: white;
    border-top: 1px solid #e0e0e0;
  }

  &__action {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }

    &--nope {
      box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
    }

    &--like {
      box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
    }

    &--super {
      box-shadow: 0 4px 10px rgba(255, 193, 7, 0.3);
    }
  }
}

.card-enter-active,
.card-leave-active {
  transition: all 0.3s ease;
}

.card-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.card-leave-to {
  opacity: 0;
}
</style>
