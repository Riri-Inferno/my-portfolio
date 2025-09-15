<template>
  <div class="secret-login">
    <div class="secret-login__header">
      <BaseIcon icon="🔐" size="xlarge" />
      <BaseHeading tag="h2" align="center">
        {{ title }}
      </BaseHeading>
      <p class="secret-login__subtitle">
        {{ subtitle }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="secret-login__form">
      <BaseInput
        v-model="formData.password"
        type="password"
        label="パスワード"
        placeholder="パスワードを入力"
        :error="errors.password"
        required
      />

      <BaseInput
        v-if="showEmailField"
        v-model="formData.email"
        type="email"
        label="メールアドレス"
        placeholder="email@example.com"
        :error="errors.email"
      />

      <div v-if="showHint" class="secret-login__hint">
        <BaseIcon icon="💡" size="small" />
        <span>{{ hint }}</span>
      </div>

      <BaseButton
        type="submit"
        variant="primary"
        full-width
        :loading="isLoading"
        :disabled="!isValid"
      >
        {{ submitText }}
      </BaseButton>

      <div v-if="$slots.footer" class="secret-login__footer">
        <slot name="footer" />
      </div>
    </form>

    <div v-if="showAttempts && maxAttempts" class="secret-login__attempts">
      残り試行回数: {{ remainingAttempts }} / {{ maxAttempts }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

interface LoginFormData {
  password: string
  email: string
}

interface SecretLoginFormProps {
  title?: string
  subtitle?: string
  submitText?: string
  showEmailField?: boolean
  showHint?: boolean
  hint?: string
  maxAttempts?: number
  showAttempts?: boolean
}

interface SecretLoginFormEmits {
  (e: 'submit', data: LoginFormData): void
  (e: 'success', data: LoginFormData): void
  (e: 'error', error: string): void
}

const props = withDefaults(defineProps<SecretLoginFormProps>(), {
  title: '認証が必要です',
  subtitle: '続行するにはパスワードを入力してください',
  submitText: 'ログイン',
  showEmailField: false,
  showHint: false,
  hint: 'ヒント: 履歴書に記載されています',
  showAttempts: true,
})

const emit = defineEmits<SecretLoginFormEmits>()

const formData = ref<LoginFormData>({
  password: '',
  email: '',
})

const errors = ref({
  password: '',
  email: '',
})

const isLoading = ref(false)
const attemptCount = ref(0)

const remainingAttempts = computed(() => {
  if (!props.maxAttempts) return Infinity
  return props.maxAttempts - attemptCount.value
})

const isValid = computed(() => {
  if (!formData.value.password) return false
  if (props.showEmailField && !formData.value.email) return false
  if (remainingAttempts.value <= 0) return false
  return true
})

// パスワード入力時にエラーをクリア
watch(
  () => formData.value.password,
  () => {
    errors.value.password = ''
  },
)

watch(
  () => formData.value.email,
  () => {
    errors.value.email = ''
  },
)

const validateForm = (): boolean => {
  let isValid = true

  if (!formData.value.password) {
    errors.value.password = 'パスワードを入力してください'
    isValid = false
  }

  if (props.showEmailField && !formData.value.email) {
    errors.value.email = 'メールアドレスを入力してください'
    isValid = false
  }

  if (props.showEmailField && formData.value.email && !formData.value.email.includes('@')) {
    errors.value.email = '有効なメールアドレスを入力してください'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  attemptCount.value++

  try {
    // 親コンポーネントに送信
    emit('submit', { ...formData.value })

    // デモ用: 2秒後に完了
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 成功をシミュレート（実際は親コンポーネントで判定）
    if (formData.value.password === 'demo123') {
      emit('success', { ...formData.value })
    } else {
      throw new Error('パスワードが正しくありません')
    }
  } catch (error) {
    errors.value.password = error instanceof Error ? error.message : 'エラーが発生しました'
    emit('error', errors.value.password)

    if (props.maxAttempts && attemptCount.value >= props.maxAttempts) {
      errors.value.password = '試行回数の上限に達しました'
    }
  } finally {
    isLoading.value = false
  }
}

// 外部からリセットできるように公開
const reset = () => {
  formData.value = { password: '', email: '' }
  errors.value = { password: '', email: '' }
  attemptCount.value = 0
}

defineExpose({
  reset,
})
</script>

<style lang="scss" scoped>
.secret-login {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &__header {
    text-align: center;
    margin-bottom: 32px;
  }

  &__subtitle {
    margin: 8px 0 0;
    color: #666;
    font-size: 14px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__hint {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background-color: #f0f8ff;
    border-radius: 8px;
    font-size: 14px;
    color: #0066cc;
  }

  &__footer {
    margin-top: 20px;
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
  }

  &__attempts {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
