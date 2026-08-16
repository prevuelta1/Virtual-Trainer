import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import SelectCard from '../components/SelectCard.jsx'
import { ArrowRight } from '../components/Icons.jsx'
import { useProfile } from '../state/ProfileContext.jsx'
import { GOALS } from '../data/planGenerator.js'
import { screenByKey } from '../navigation/flow.js'

export default function Goals() {
  const { profile, toggle } = useProfile()
  const screen = screenByKey('goals')

  const chosen = profile.goals
  const canContinue = chosen.length > 0

  return (
    <Screen
      title="What do you want out of lifting?"
      step={screen.step}
      footer={
        <>
          <Button to="/experience" disabled={!canContinue}>
            Continue
            <ArrowRight size={20} />
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            {canContinue
              ? `Main focus: ${GOALS.find((goal) => goal.id === chosen[0])?.label}`
              : 'Pick at least one to continue'}
          </p>
        </>
      }
    >
      <p className="text-[15px] leading-relaxed text-ink-soft">
        Pick as many as you like. Whatever you choose first becomes your main focus, and we build
        the plan around it.
      </p>

      <div className="mt-5 space-y-2.5">
        {GOALS.map((goal) => {
          const selected = chosen.includes(goal.id)
          return (
            <SelectCard
              key={goal.id}
              selected={selected}
              onClick={() => toggle('goals', goal.id)}
              title={goal.label}
              blurb={goal.blurb}
              badge="Main focus"
              badgeVisible={chosen[0] === goal.id}
            />
          )
        })}
      </div>
    </Screen>
  )
}
