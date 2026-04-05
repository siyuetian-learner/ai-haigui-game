import type { AiMode } from './ai'
import type { Message } from '../types/message'
import type { Story } from '../types/story'

export function buildPromptPayload(params: {
  story: Story
  question: string
  history: Message[]
  mode: AiMode
}) {
  const { story, question, history, mode } = params
  return {
    storyId: story.id,
    surface: story.surface,
    bottom: story.bottom,
    coreFacts: story.keyPoints,
    keywords: story.keyPoints,
    userQuestion: question,
    history,
    mode,
  }
}

