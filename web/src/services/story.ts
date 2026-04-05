import { STORIES } from '../data/stories'
import type { Story } from '../types/story'

export function getStoryById(storyId: string): Story | undefined {
  return STORIES.find((s) => s.id === storyId)
}

