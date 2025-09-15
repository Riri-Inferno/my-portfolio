<template>
  <div class="skill-item">
    <div class="skill-item__header">
      <div class="skill-item__title-group">
        <BaseIcon v-if="icon" :icon="icon" size="small" />
        <h4 class="skill-item__name">{{ name }}</h4>
      </div>
      <div class="skill-item__meta">
        <BaseBadge v-if="level" :variant="levelVariant">
          {{ levelText }}
        </BaseBadge>
        <span v-if="experience" class="skill-item__experience">
          {{ experience }}
        </span>
      </div>
    </div>

    <BaseProgressBar
      v-if="showProgress"
      :value="progressValue"
      :variant="levelVariant"
      :height="6"
      class="skill-item__progress"
    />

    <p v-if="description" class="skill-item__description">
      {{ description }}
    </p>

    <div v-if="subSkills && subSkills.length > 0" class="skill-item__sub-skills">
      <BaseTag v-for="subSkill in subSkills" :key="subSkill" size="small">
        {{ subSkill }}
      </BaseTag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import BaseProgressBar from '@/components/atoms/BaseProgressBar.vue'
import BaseTag from '@/components/atoms/BaseTag.vue'

interface SkillItemProps {
  name: string
  icon?: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  experience?: string
  description?: string
  subSkills?: string[]
  showProgress?: boolean
  customProgress?: number
}

const props = withDefaults(defineProps<SkillItemProps>(), {
  showProgress: true,
})

const levelText = computed(() => {
  const levelMap = {
    beginner: '初級',
    intermediate: '中級',
    advanced: '上級',
    expert: 'エキスパート',
  }
  return props.level ? levelMap[props.level] : ''
})

const levelVariant = computed(() => {
  const variantMap = {
    beginner: 'secondary',
    intermediate: 'primary',
    advanced: 'success',
    expert: 'danger',
  } as const
  return props.level ? variantMap[props.level] : 'primary'
})

const progressValue = computed(() => {
  if (props.customProgress !== undefined) return props.customProgress

  const progressMap = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 95,
  }
  return props.level ? progressMap[props.level] : 0
})
</script>

<style lang="scss" scoped>
.skill-item {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__title-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__name {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__experience {
    font-size: 14px;
    color: #666;
  }

  &__progress {
    margin-bottom: 12px;
  }

  &__description {
    margin: 8px 0;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }

  &__sub-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
  }
}
</style>
