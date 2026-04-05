import type { Story } from '../types/story'

export default function StoryReveal({ story }: { story: Story }) {
  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm font-semibold text-white/90">真相</h3>
      <p className="whitespace-pre-wrap text-sm text-white/70">{story.bottom}</p>
    </div>
  )
}

