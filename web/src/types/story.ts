export type StoryDifficulty = 'easy' | 'medium' | 'hard' | 'hell'

// MVP 支持的题材分类（与 PRD/TECH_DESIGN 保持一致）
export type StoryCategory = 'classic' | 'thriller' | 'twist' | 'daily' | 'brain'

export type Story = {
  id: string
  title: string
  difficulty: StoryDifficulty
  category: StoryCategory
  tags: string[]
  surface: string
  bottom: string
  keyPoints: string[]
  hints: {
    light: string[]
    medium: string[]
    strong: string[]
  }
  contentWarning?: string
}

