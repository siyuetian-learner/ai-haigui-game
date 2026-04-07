import DeepSeaBackground from './DeepSeaBackground'
import MysticTitle from './MysticTitle'
import RuleCard from './RuleCard'
import EnergyCoreButton from './EnergyCoreButton'

export default function WelcomePage() {
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
