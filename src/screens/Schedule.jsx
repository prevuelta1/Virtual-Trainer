import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import SelectCard from '../components/SelectCard.jsx'
import Segmented from '../components/Segmented.jsx'
import Chip from '../components/Chip.jsx'
import Field from '../components/Field.jsx'
import { ArrowRight } from '../components/Icons.jsx'
import { useProfile } from '../state/ProfileContext.jsx'
import { EQUIPMENT, GYM_PRESETS } from '../data/exercises.js'
import { screenByKey } from '../navigation/flow.js'

const DAY_OPTIONS = [2, 3, 4, 5].map((n) => ({ value: n, label: `${n} days` }))

const LENGTH_OPTIONS = [
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '60 min' },
]

const GYM_TYPES = [
  { id: 'full', label: 'A full gym', blurb: 'Barbells, machines, cables, the works.' },
  { id: 'home', label: 'Home setup', blurb: 'A few dumbbells and maybe some bands.' },
  { id: 'bodyweight', label: 'Just me', blurb: 'No equipment at all — and that is fine.' },
]

export default function Schedule() {
  const { profile, update, toggle } = useProfile()
  const screen = screenByKey('schedule')

  // Choosing a gym type pre-fills the equipment list; the user can still refine it.
  function chooseGymType(id) {
    update({ gymType: id, equipment: GYM_PRESETS[id] })
  }

  const canContinue = Boolean(profile.gymType)

  return (
    <Screen
      title="When can you train, and with what?"
      step={screen.step}
      footer={
        <>
          <Button to="/routine" disabled={!canContinue}>
            Continue
            <ArrowRight size={20} />
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            {canContinue
              ? `${profile.daysPerWeek} days a week · ${profile.sessionLength} minutes`
              : 'Tell us where you will be training'}
          </p>
        </>
      }
    >
      <p className="text-[15px] leading-relaxed text-ink-soft">
        Be realistic rather than ambitious — a plan you actually finish beats a perfect one you
        skip.
      </p>

      <Field label="Days per week">
        <Segmented
          options={DAY_OPTIONS}
          value={profile.daysPerWeek}
          onChange={(value) => update({ daysPerWeek: value })}
        />
      </Field>

      <Field label="Time per session">
        <Segmented
          options={LENGTH_OPTIONS}
          value={profile.sessionLength}
          onChange={(value) => update({ sessionLength: value })}
        />
      </Field>

      <Field label="Where will you train?">
        <div className="space-y-2.5">
          {GYM_TYPES.map((type) => (
            <SelectCard
              key={type.id}
              selected={profile.gymType === type.id}
              onClick={() => chooseGymType(type.id)}
              title={type.label}
              blurb={type.blurb}
            />
          ))}
        </div>
      </Field>

      {profile.gymType && profile.gymType !== 'bodyweight' && (
        <Field label="What do you have?" hint="We pre-filled this — tap to adjust.">
          <div className="flex flex-wrap gap-2">
            {EQUIPMENT.map((item) => (
              <Chip
                key={item.id}
                selected={profile.equipment.includes(item.id)}
                onClick={() => toggle('equipment', item.id)}
              >
                {item.label}
              </Chip>
            ))}
          </div>
        </Field>
      )}
    </Screen>
  )
}
