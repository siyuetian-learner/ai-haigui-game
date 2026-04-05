import { useMemo, useState } from 'react'
import type { GameSession } from '../types/session'
import type { Story } from '../types/story'

export function useGameSession() {
  const [session, setSession] = useState<GameSession | null>(null)

  const isActive = session?.status === 'playing'

  const api = useMemo(
    () => ({
      session,
      isActive,
      startNewGame: (story: Story) => {
        setSession({
          sessionId: `sess-${Date.now()}`,
          storyId: story.id,
          status: 'playing',
          questionCount: 0,
          usedHints: { light: 0, medium: 0, strong: 0 },
          startedAt: Date.now(),
          messages: [],
          guessedCorrectly: false,
        })
      },
      endGame: () => {
        setSession((prev) => (prev ? { ...prev, status: 'abandoned' } : prev))
      },
      revealBottom: () => {
        setSession((prev) => (prev ? { ...prev, status: 'revealed' } : prev))
      },
    }),
    [session, isActive],
  )

  return api
}

