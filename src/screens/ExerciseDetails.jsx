import { useParams } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import ExerciseVisual from '../components/ExerciseVisual.jsx'
import { ArrowRight, Check, Target } from '../components/Icons.jsx'
import { exerciseById, PATTERN_LABELS } from '../data/exercises.js'
import { useActiveDay } from '../state/usePlan.js'

export default function ExerciseDetails() {
  const { exerciseId } = useParams()
  const { day, plan } = useActiveDay()

  // Prefer today's version, which carries the prescribed sets and reps. Fall
  // back to the library so a deep link still renders something useful.
  const plannedIndex = day.exercises.findIndex((item) => item.id === exerciseId)
  const planned = plannedIndex >= 0 ? day.exercises[plannedIndex] : null
  const exercise = planned ?? exerciseById(exerciseId)

  if (!exercise) {
    return (
      <Screen title="Exercise not found" footer={<Button to="/workout">Back to workout</Button>}>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          We don&rsquo;t have an exercise with that name. Head back and pick one from today&rsquo;s
          list.
        </p>
      </Screen>
    )
  }

  // Only movements that are actually in today's workout have a position in it,
  // so a deep link to something else gets the return action rather than a
  // meaningless "next".
  const total = day.exercises.length
  const position = planned ? plannedIndex + 1 : null
  const next = planned ? (day.exercises[plannedIndex + 1] ?? null) : null

  return (
    <Screen
      footer={
        next ? (
          <>
            {/* `replace` keeps the history stack flat, so the back arrow returns
                to the workout instead of walking back through every movement. */}
            <Button to={`/workout/exercise/${next.id}`} replace>
              Next exercise
              <ArrowRight size={20} />
            </Button>
            <p className="mt-2.5 truncate text-center text-xs text-muted">
              Up next: {next.name}
            </p>
          </>
        ) : (
          <>
            <Button to="/workout">
              <Check size={20} />
              Back to workout
            </Button>
            <p className="mt-2.5 text-center text-xs text-muted">
              {planned ? `Last exercise of ${day.name}` : 'Not part of today’s workout'}
            </p>
          </>
        )
      }
    >
      <ExerciseVisual name={exercise.name} />

      <header className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold tracking-wide text-brand-dark uppercase">
            {PATTERN_LABELS[exercise.pattern] ?? 'Movement'}
          </span>
          {position && (
            <span className="shrink-0 text-[11px] font-medium text-muted">
              Exercise {position} of {total}
            </span>
          )}
        </div>

        <h1 className="mt-1 text-2xl leading-tight font-bold tracking-tight">{exercise.name}</h1>
        <p className="mt-1 text-sm text-ink-soft">{exercise.muscles}</p>
      </header>

      {planned && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-brand-soft p-4 ring-1 ring-brand/15">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-card text-brand-dark">
            <Target size={20} />
          </span>
          <div>
            <p className="text-[15px] font-bold">
              {planned.sets} sets × {planned.reps}
            </p>
            <p className="mt-0.5 text-xs text-ink-soft">Rest {planned.rest} between sets</p>
          </div>
        </div>
      )}

      <section className="mt-6">
        <h2 className="text-xs font-bold tracking-wide text-muted uppercase">How to do it</h2>
        <ol className="mt-3 space-y-3">
          {exercise.cues.map((cue, i) => (
            <li key={cue} className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-ink-soft">{cue}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-7">
        <h2 className="text-xs font-bold tracking-wide text-muted uppercase">Watch out for</h2>
        <ul className="mt-3 space-y-2.5 rounded-2xl bg-card p-4 ring-1 ring-line">
          {exercise.mistakes.map((mistake) => (
            <li key={mistake} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {mistake}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-7">
        <h2 className="text-xs font-bold tracking-wide text-muted uppercase">Where to start</h2>
        <p className="mt-2.5 rounded-2xl bg-card p-4 text-sm leading-relaxed text-ink-soft ring-1 ring-line">
          {exercise.start}
        </p>
      </section>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        Not sure? Start lighter than you think. You can always add weight
        <br />
        next session — that&rsquo;s the whole point of {plan.weeks} weeks.
      </p>
    </Screen>
  )
}
