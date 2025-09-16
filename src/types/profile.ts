export type SkillLevel = 'expert' | 'advanced' | 'intermediate' | 'beginner'
export type UserStatus = 'online' | 'offline' | 'away'
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface ContactInfo {
  email: string
  phone: string
  website: string
  location: string
  socialLinks: SocialLink[]
}

export interface Skill {
  name: string
  icon: string
  level: SkillLevel
  experience: string
  description: string
  subSkills: string[]
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
}

export interface ProfileAction {
  label: string
  icon: string
  variant: ButtonVariant
  value?: string
}

export interface UserProfile {
  name: string
  title: string
  location: string
  age: number
  avatarUrl: string
  tags: string[]
  status: UserStatus
  verified: boolean
  bio: string[]
  skills: Skill[]
  experience: Experience[]
  contact: ContactInfo
  actions: ProfileAction[]
}
