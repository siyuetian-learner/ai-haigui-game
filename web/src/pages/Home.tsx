import DeepSeaBackground from '../components/DeepSeaBackground'
import MysticTitle from '../components/MysticTitle'
import RuleCard from '../components/RuleCard'
import EnergyCoreButton from '../components/EnergyCoreButton'

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
    </div>
  )
}
