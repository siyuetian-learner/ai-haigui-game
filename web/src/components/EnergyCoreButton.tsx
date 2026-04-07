import { Link } from 'react-router-dom'
import { STORIES } from '../data/stories'

export default function EnergyCoreButton() {
  return (
    <div className="relative">
      <div className="energy-core-wrapper">
        <div className="energy-ring energy-ring-outer" />
        <div className="energy-ring energy-ring-middle" />
        <div className="energy-ring energy-ring-inner" />
        <div className="energy-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="energy-particle"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
        <Link
          to={`/game?storyId=${STORIES[0]?.id ?? ''}`}
          className="energy-core-button"
        >
          <span className="energy-core-text">开始游戏</span>
          <span className="energy-core-shine" />
        </Link>
      </div>
    </div>
  )
}
