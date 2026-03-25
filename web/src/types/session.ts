import type { Message } from './message'

export type GameSessionStatus = 'playing' | 'revealed' | 'finished' | 'abandoned'

export type GameSession = {
  sessionId: string
  storyId: string
  status: GameSessionStatus
  questionCount: number
  usedHints: {
    light: number
    medium: number
    strong: number
  }
  startedAt: number
  endedAt?: number
  messages: Message[]
  guessedCorrectly: boolean
  revealReason?: 'user_click' | 'timeout' | 'correct_guess' | 'quit'
}

