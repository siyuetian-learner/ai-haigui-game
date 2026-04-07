import { Link } from 'react-router-dom'
import DeepSeaBackground from '../components/DeepSeaBackground'
import MysticTitle from '../components/MysticTitle'
import RuleCard from '../components/RuleCard'
import EnergyCoreButton from '../components/EnergyCoreButton'
import { STORIES } from '../data/stories'
import GameCard from '../components/GameCard'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <DeepSeaBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-12">
          <MysticTitle />

          <RuleCard />

          <div className="flex flex-col items-center gap-8">
            <EnergyCoreButton />

            <p className="welcome-footer-text">
              准备好挑战你的智慧了吗？
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-xs font-medium tracking-[0.2em] uppercase text-[var(--text)]">
            选择谜案
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {STORIES.map((story) => (
              <Link
                key={story.id}
                to={`/game?storyId=${story.id}`}
                className="block"
              >
                <GameCard story={story} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
