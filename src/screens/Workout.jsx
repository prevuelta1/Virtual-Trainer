import { Link, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import { ChevronRight, Clock, Flame, Play } from '../components/Icons.jsx'
import { useSession } from '../state/SessionContext.jsx'
import { useActiveDay } from '../state/usePlan.js'

const WARM_UP = [
  '5 minutes easy walking or cycling',
  '10 bodyweight squats',
  '10 arm circles each way',
]

export default function Workout() {
  const { plan, day } = useActiveDay()
  const { activeDayIndex, startDay, beginSession } = useSession()
  const navigate = useNavigate()

  function start() {
    beginSession()
    navigate('/workout/track')
  }

  return (
    <Screen
      eyebrow={`Day ${day.index} of ${plan.daysPerWeek}`}
      title={day.name}
      footer={
        <>
          <Button onClick={start}>
            <Play size={20} />
            Start workout
          </Button>
          <p className="mt-2.5 text-center text-xs text-muted">
            {day.exercises.length} exercises · about {plan.sessionLength} minutes
          </p>
        </>
      }
    >
      {/* Session context, before any controls. */}
      <p className="text-sm text-ink-soft">{day.focus}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium whitespace-nowrap text-ink-soft ring-1 ring-line">
          <Clock size={14} className="shrink-0" />
          {plan.sessionLength} min
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium whitespace-nowrap text-ink-soft ring-1 ring-line">
          <Flame size={14} className="shrink-0" />
          {plan.scheme.sets} × {plan.scheme.reps}
        </span>
      </div>

      {/* Day switcher sits after the context it changes. */}
      <section className="mt-5">
        <h2 className="text-[11px] font-semibold tracking-wide text-muted uppercase">Switch day</h2>
        <div className="-mx-5 mt-2 flex gap-2 overflow-x-auto px-5 pb-1">
          {plan.days.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => startDay(option.index)}
              aria-pressed={option.index === activeDayIndex}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.97] motion-reduce:transition-none ${
                option.index === activeDayIndex
                  ? 'bg-brand text-white ring-1 ring-brand'
                  : 'bg-card text-ink-soft ring-1 ring-line hover:ring-muted/40'
              }`}
            >
              Day {option.index}
            </button>
          ))}
        </div>
      </section>

      {/* Warm-up: supportive, deliberately unweighted so the moves below lead. */}
      <section className="mt-6">
        <h2 className="text-xs font-bold tracking-wide text-muted uppercase">First, warm up</h2>
        <ul className="mt-2 space-y-1.5">
          {WARM_UP.map((item) => (
            <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-soft">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* The prescribed work — the primary content of this screen. */}
      <section className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xs font-bold tracking-wide text-muted uppercase">
            Today&rsquo;s moves
          </h2>
          <span className="text-[11px] text-muted">{day.exercises.length} exercises</span>
        </div>

        <ol className="mt-3 space-y-2.5">
          {day.exercises.map((exercise, i) => (
            <li key={exercise.id}>
              <Link
                to={`/workout/exercise/${exercise.id}`}
                className="flex items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-line transition duration-200 hover:ring-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.99] motion-reduce:transition-none"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold">{exercise.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {exercise.sets} sets × {exercise.reps} · {exercise.muscles}
                  </p>
                </div>

                <ChevronRight size={18} className="shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-4 text-center text-xs leading-relaxed text-muted">
          Tap any exercise to see how it&rsquo;s done before you start.
        </p>
      </section>
    </Screen>
  )
}
