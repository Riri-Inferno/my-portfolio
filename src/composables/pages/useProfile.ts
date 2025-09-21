import { ref } from 'vue'
import { formatPeriod } from '@/utils/dateFormatter'
import type { UserProfile, Experience, ProfileAction } from '@/types/profile'

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

// APIレスポンスの型定義
interface ApiExperience extends Omit<Experience, 'period'> {
  period: {
    from: string
    to: string | null
  }
}

interface ApiUserProfile extends Omit<UserProfile, 'experience'> {
  experience: ApiExperience[]
}

export const useProfile = () => {
  const profileData = ref<UserProfile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchProfile = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data: ApiUserProfile = await response.json()

      // データを整形
      const formattedData: UserProfile = {
        ...data,
        // experienceのperiodを文字列に変換
        experience: data.experience.map(
          (exp: ApiExperience): Experience => ({
            ...exp,
            period: formatPeriod(exp.period),
          }),
        ),
        // actionsにvalueがない場合は空文字列を追加
        actions: data.actions.map(
          (action: ProfileAction): ProfileAction => ({
            ...action,
            value: action.value || '',
          }),
        ),
      }

      profileData.value = formattedData
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      isLoading.value = false
    }
  }

  fetchProfile()

  return {
    profileData,
    isLoading,
    error,
    fetchProfile,
  }
}
