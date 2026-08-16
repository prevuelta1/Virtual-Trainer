import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import SelectCard from '../components/SelectCard.jsx'
import Chip from '../components/Chip.jsx'
import Field from '../components/Field.jsx'
import { Sparkle } from '../components/Icons.jsx'
import { useProfile } from '../state/ProfileContext.jsx'
import { EXERCISES } from '../data/exercises.js'
import { screenByKey } from '../navigation/flow.js'

const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Not much right now', blurb: 'Mostly sitting. We will start gently.' },
  { id: 'active', label: 'Active, but no lifting', blurb: 'Walking, running, cycling, sport.' },
  { id: 'training', label: 'Already training', blurb: 'You lift sometimes, just not to a plan.' },
]

/** A recognisable subset — enough to feel personal without a wall of chips. */
const FAMILIAR_IDS = [
  'bodyweight-squat',
  'pushup',
  'plank',
  'goblet-squat',
  'db-row',
  'db-bench-press',
  'db-shoulder-press',
  'glute-bridge',
  'reverse-lunge',
  'lat-pulldown',
  'barbell-back-squat',
  'barbell-deadlift',
]

const FRUSTRATIONS = [
  { id: 'no-plan', label: 'I never knew what to do', blurb: 'You wandered between machines.' },
  { id: 'no-time', label: 'Sessions took too long', blurb: 'Life got in the way.' },
  { id: 'unsure-form', label: 'I worried I was doing it wrong', blurb: 'Nobody showed you how.' },
  { id: 'lost-momentum', label: 'I lost momentum', blurb: 'Started strong, faded out.' },
  { id: 'first-time', label: 'This is my first attempt', blurb: 'Nothing to undo. Clean slate.' },
]

export default function Routine() {
  const { profile, update, toggle } = useProfile()
  const screen = screenByKey('routine')

  const familiar = FAMILIAR_IDS.map((id) => EXERCISES.find((e) => e.id === id)).filter(Boolean)
  const canContinue = Boolean(profile.activityLevel)

  return (
    <Screen
      title="What are you doing right now?"
      step={screen.step}
      footer={
        <>
          <Button to="/plan" disabled={!canContinue}>
            <Sparkle size={20} />
            Build my plan
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            {canContinue ? 'Last question — your plan is next' : 'Pick your current activity level'}
          </p>
        </>
      }
    >
      <p className="text-[15px] leading-relaxed text-ink-soft">
        Last one. This helps us pitch the first week at the right level.
      </p>

      <Field label="Current activity">
        <div className="space-y-2.5">
          {ACTIVITY_LEVELS.map((level) => (
            <SelectCard
              key={level.id}
              selected={profile.activityLevel === level.id}
              onClick={() => update({ activityLevel: level.id })}
              title={level.label}
              blurb={level.blurb}
            />
          ))}
        </div>
      </Field>

      <Field
        label="Any of these look familiar?"
        hint={
          profile.knownExercises.length > 0
            ? `${profile.knownExercises.length} selected. We will favour these for your first week.`
            : 'Optional. We will favour movements you already know for your first week.'
        }
      >
        <div className="flex flex-wrap gap-2">
          {familiar.map((exercise) => (
            <Chip
              key={exercise.id}
              selected={profile.knownExercises.includes(exercise.id)}
              onClick={() => toggle('knownExercises', exercise.id)}
            >
              {exercise.name}
            </Chip>
          ))}
        </div>
      </Field>

      <Field label="What has held you back before?" hint="Optional.">
        <div className="space-y-2.5">
          {FRUSTRATIONS.map((item) => (
            <SelectCard
              key={item.id}
              selected={profile.frustration === item.id}
              onClick={() =>
                update({ frustration: profile.frustration === item.id ? null : item.id })
              }
              title={item.label}
              blurb={item.blurb}
            />
          ))}
        </div>
      </Field>
    </Screen>
  )
}
