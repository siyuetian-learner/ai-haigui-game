import GameInterface from '../components/GameInterface'
import { useSearchParams } from 'react-router-dom'

export default function Game() {
  const [searchParams] = useSearchParams()
  const storyId = searchParams.get('storyId') ?? ''

  return <GameInterface storyId={storyId} />
}
