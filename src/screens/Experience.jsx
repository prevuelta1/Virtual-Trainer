import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import SelectCard from '../components/SelectCard.jsx'
import Chip from '../components/Chip.jsx'
import Field from '../components/Field.jsx'
import { ArrowRight } from '../components/Icons.jsx'
import { useProfile } from '../state/ProfileContext.jsx'
import { LIMITATION_LABELS } from '../data/planGenerator.js'
import { screenByKey } from '../navigation/flow.js'

const LEVELS = [
  { id: 'never', label: 'I have never lifted weights', blurb: 'Totally new to this. Great place to start.' },
  { id: 'tried', label: 'I have tried it a few times', blurb: 'You know your way around, roughly.' },
  { id: 'months', label: 'I have trained for a few months', blurb: 'You want more structure than you have now.' },
]

const BARBELL_COMFORT = [
  { id: 'nervous', label: 'Honestly, they intimidate me', blurb: 'We will skip barbells entirely for now.' },
  { id: 'curious', label: 'Curious but unsure', blurb: 'We will ease you in with lighter versions first.' },
  { id: 'comfortable', label: 'Comfortable enough', blurb: 'Barbell lifts can anchor your plan.' },
]

export default function Experience() {
  const { profile, update, toggle } = useProfile()
  const screen = screenByKey('experience')

  const canContinue = Boolean(profile.experience && profile.barbellComfort)

  return (
    <Screen
      title="How much lifting have you done?"
      step={screen.step}
      footer={
        <>
          <Button to="/schedule" disabled={!canContinue}>
            Continue
            <ArrowRight size={20} />
          </Button>
          {!canContinue && (
            <p className="mt-3 text-center text-xs text-muted">
              Answer the first two questions to continue
            </p>
          )}
        </>
      }
    >
      <p className="text-[15px] leading-relaxed text-ink-soft">
        There is no wrong answer here. It just tells us where to start you.
      </p>

      <Field label="Experience">
        <div className="space-y-2.5">
          {LEVELS.map((level) => (
            <SelectCard
              key={level.id}
              selected={profile.experience === level.id}
              onClick={() => update({ experience: level.id })}
              title={level.label}
              blurb={level.blurb}
            />
          ))}
        </div>
      </Field>

      <Field label="Barbells and free weights">
        <div className="space-y-2.5">
          {BARBELL_COMFORT.map((option) => (
            <SelectCard
              key={option.id}
              selected={profile.barbellComfort === option.id}
              onClick={() => update({ barbellComfort: option.id })}
              title={option.label}
              blurb={option.blurb}
            />
          ))}
        </div>
      </Field>

      <Field
        label="Anything to work around?"
        hint="Optional. We will swap out movements that tend to aggravate these."
      >
        <div className="flex flex-wrap gap-2">
          {Object.entries(LIMITATION_LABELS).map(([id, label]) => (
            <Chip
              key={id}
              selected={profile.limitations.includes(id)}
              onClick={() => toggle('limitations', id)}
            >
              {label}
            </Chip>
          ))}
        </div>
      </Field>
    </Screen>
  )
}
