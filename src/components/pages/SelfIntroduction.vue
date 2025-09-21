<template>
  <div class="about-page">
    <!-- トップページに戻るボタン -->
    <div class="back-button">
      <BaseButton variant="ghost" @click="$router.push('/')">
        <BaseIcon icon="←" /> 戻る
      </BaseButton>
    </div>

    <!-- 開発用フラグ切り替え -->
    <div style="position: fixed; bottom: 10px; right: 10px; opacity: 1; z-index: 9999">
      <BaseButton size="small" @click="toggleFakeProfile">
        {{ isFakeProfile ? 'Push to Real' : 'Push to Fake' }}
      </BaseButton>
    </div>

    <!-- プロフィールコンテンツ -->
    <div v-if="currentProfile" class="profile-container">
      <!-- プロフィールヘッダー -->
      <ProfileHeader
        :name="currentProfile.name"
        :title="currentProfile.title"
        :location="currentProfile.location"
        :age="currentProfile.age"
        :avatar-url="currentProfile.avatarUrl"
        :tags="currentProfile.tags"
        :status="currentProfile.status"
        :verified="currentProfile.verified"
      >
        <template #actions>
          <BaseButton
            v-for="action in currentProfile.actions"
            :key="action.label"
            :variant="action.variant"
            size="small"
            @click="handleAction(action)"
          >
            <BaseIcon v-if="action.icon" :icon="action.icon" />
            {{ action.label }}
          </BaseButton>
        </template>
      </ProfileHeader>

      <BaseDivider style="margin: 40px 0" />

      <!-- 自己紹介 -->
      <section class="section">
        <BaseHeading tag="h2"> <BaseIcon icon="📝" /> 自己紹介 </BaseHeading>
        <div class="bio-content">
          <p v-for="(paragraph, index) in currentProfile.bio" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </section>

      <!-- スキル -->
      <section class="section">
        <BaseHeading tag="h2"> <BaseIcon icon="💪" /> スキル </BaseHeading>
        <div class="skills-grid">
          <SkillItem
            v-for="skill in currentProfile.skills"
            :key="skill.name"
            :name="skill.name"
            :icon="skill.icon"
            :level="skill.level"
            :experience="skill.experience"
            :description="skill.description"
            :sub-skills="skill.subSkills"
          />
        </div>
      </section>

      <!-- 経歴 -->
      <section class="section">
        <BaseHeading tag="h2"> <BaseIcon icon="💼" /> 経歴 </BaseHeading>
        <div class="timeline">
          <div v-for="(item, index) in sortedExperience" :key="index" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <BaseHeading tag="h4" no-margin>{{ item.title }}</BaseHeading>
              <p class="timeline-company">{{ item.company }}</p>
              <p class="timeline-period">{{ item.period }}</p>
              <p class="timeline-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 連絡先 -->
      <section class="section">
        <ContactInfo
          title="連絡先"
          :email="currentProfile.contact.email"
          :phone="currentProfile.contact.phone"
          :website="currentProfile.contact.website"
          :location="currentProfile.contact.location"
          :social-links="currentProfile.contact.socialLinks"
        >
          <template #extra>
            <BaseButton variant="primary" full-width @click="handleContact">
              お問い合わせ
            </BaseButton>
          </template>
        </ContactInfo>
      </section>
    </div>

    <!-- ローディング中 -->
    <div v-else-if="!isFakeProfile && isLoading" class="loading-container">
      <p>Loading...</p>
    </div>

    <!-- エラー表示 -->
    <div v-else-if="!isFakeProfile && error" class="error-container">
      <p>Error: {{ error }}</p>
    </div>
  </div>

  <!-- 生データ表示（開発用） -->
  <!-- <div style="margin-top: 100px; padding: 20px; background: #f5f5f5">
    <h1>got data here</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="profileData">
      <pre>{{ JSON.stringify(profileData, null, 2) }}</pre>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseDivider from '@/components/atoms/BaseDivider.vue'
import ProfileHeader from '@/components/molecules/ProfileHeader.vue'
import SkillItem from '@/components/molecules/SkillItem.vue'
import ContactInfo from '@/components/molecules/ContactInfo.vue'
import { mockUserProfile } from '@/mocks/profile'
import type { ProfileAction } from '@/types/profile'
import { useProfile } from '@/composables/pages/useProfile'

// プロフィールデータの取得
const { profileData, isLoading, error } = useProfile()

// フェイクプロフィールフラグ
const isFakeProfile = ref(false)

// 現在表示するプロフィール
const currentProfile = computed(() => {
  return isFakeProfile.value ? mockUserProfile : profileData.value
})

// フラグの切り替え
const toggleFakeProfile = () => {
  isFakeProfile.value = !isFakeProfile.value
}

// アクションハンドラー
const handleAction = (action: ProfileAction) => {
  console.log('Action clicked:', action)

  if (action.value) {
    // valueがある場合は適切な処理を行う
    if (action.value.startsWith('http')) {
      window.open(action.value, '_blank')
    } else if (action.value.startsWith('mailto:')) {
      window.location.href = action.value
    }
  }
}

const handleContact = () => {
  console.log('お問い合わせボタンがクリックされました')
  // TODO:連絡フォームを開くなど
}

// 経歴を開始日で昇順ソート
const sortedExperience = computed(() => {
  if (!currentProfile.value) return []

  return [...currentProfile.value.experience].sort((a, b) => {
    // period文字列から年月を抽出して比較
    const getStartDate = (period: string) => {
      const match = period.match(/(\d{4})年(\d{1,2})月/)
      if (match) {
        return new Date(parseInt(match[1]), parseInt(match[2]) - 1)
      }
      return new Date()
    }

    return getStartDate(a.period).getTime() - getStartDate(b.period).getTime()
  })
})
</script>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.back-button {
  margin-bottom: 20px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section {
  margin-bottom: 60px;

  &:last-child {
    margin-bottom: 0;
  }
}

.bio-content {
  margin-top: 20px;

  p {
    margin-bottom: 16px;
    line-height: 1.8;
    color: #333;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.skills-grid {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}

// タイムライン
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-marker {
  position: absolute;
  left: -26px;
  top: 5px;
  width: 12px;
  height: 12px;
  background: #007bff;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px #e0e0e0;
}

.timeline-content {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timeline-company {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0;
}

.timeline-period {
  color: #999;
  font-size: 0.85em;
  margin: 5px 0;
}

.timeline-description {
  margin-top: 10px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 20px;
  }

  .timeline {
    padding-left: 20px;
  }

  .timeline-marker {
    left: -26px;
  }
}

.loading-container,
.error-container {
  padding: 40px;
  text-align: center;
}
</style>
