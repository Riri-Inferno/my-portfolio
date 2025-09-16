<template>
  <div class="about-page">
    <!-- トップページに戻るボタン -->
    <div class="back-button">
      <BaseButton variant="ghost" @click="$router.push('/')">
        <BaseIcon icon="←" /> 戻る
      </BaseButton>
    </div>

    <!-- プロフィールコンテンツ -->
    <div class="profile-container">
      <!-- プロフィールヘッダー -->
      <ProfileHeader
        :name="profile.name"
        :title="profile.title"
        :location="profile.location"
        :age="profile.age"
        :avatar-url="profile.avatarUrl"
        :tags="profile.tags"
        :status="profile.status"
        :verified="profile.verified"
      >
        <template #actions>
          <BaseButton
            v-for="action in profile.actions"
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
          <p v-for="(paragraph, index) in profile.bio" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </section>

      <!-- スキル -->
      <section class="section">
        <BaseHeading tag="h2"> <BaseIcon icon="💪" /> スキル </BaseHeading>
        <div class="skills-grid">
          <SkillItem
            v-for="skill in profile.skills"
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
          <div v-for="(item, index) in profile.experience" :key="index" class="timeline-item">
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
          :email="profile.contact.email"
          :phone="profile.contact.phone"
          :website="profile.contact.website"
          :location="profile.contact.location"
          :social-links="profile.contact.socialLinks"
        >
          <template #extra>
            <BaseButton variant="primary" full-width @click="handleContact">
              お問い合わせ
            </BaseButton>
          </template>
        </ContactInfo>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseDivider from '@/components/atoms/BaseDivider.vue'
import ProfileHeader from '@/components/molecules/ProfileHeader.vue'
import SkillItem from '@/components/molecules/SkillItem.vue'
import ContactInfo from '@/components/molecules/ContactInfo.vue'
import { mockUserProfile } from '@/mocks/profile'
import type { ProfileAction } from '@/types/profile'

// const router = useRouter()

// モックデータを使用
const profile = mockUserProfile

// アクションハンドラー
const handleAction = (action: ProfileAction) => {
  console.log('Action clicked:', action)
  // TODO:実際の実装では適切な処理を行う
  switch (action.label) {
    case 'ポートフォリオ':
      console.log('ポートフォリオページへ遷移')
      break
    case 'ブログ':
      console.log('ブログページへ遷移')
      break
    case 'CV ダウンロード':
      console.log('CVをダウンロード')
      break
  }
}

const handleContact = () => {
  console.log('お問い合わせボタンがクリックされました')
  // 実際の実装では連絡フォームを開くなど
}
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
  margin-top: 20px;
  position: relative;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e0e0e0;
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
}

.timeline-marker {
  position: absolute;
  left: -22px;
  top: 6px;
  width: 12px;
  height: 12px;
  background: #007bff;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #e0e0e0;
}

.timeline-content {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.timeline-company {
  color: #666;
  font-weight: 500;
  margin: 4px 0;
}

.timeline-period {
  color: #999;
  font-size: 14px;
  margin: 4px 0 12px;
}

.timeline-description {
  color: #333;
  line-height: 1.6;
  margin: 0;
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
</style>
