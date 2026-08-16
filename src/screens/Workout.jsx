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
      footer={
        <>
          <Button onClick={start}>
            <Play size={20} />
            Start workout
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            {day.exercises.length} exercises · about {plan.sessionLength} minutes
          </p>
        </>
      }
    >
      {/* Day switcher — the whole week is reachable from here. */}
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {plan.days.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => startDay(option.index)}
            aria-pressed={option.index === activeDayIndex}
            className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition ${
              option.index === activeDayIndex
                ? 'bg-brand text-white'
                : 'bg-card text-ink-soft ring-1 ring-line'
            }`}
          >
            Day {option.index}
          </button>
        ))}
      </div>

      <header className="mt-5">
        <p className="text-xs font-bold tracking-wide text-brand-dark uppercase">
          Day {day.index} of {plan.daysPerWeek}
        </p>
        <h1 className="mt-1.5 text-2xl leading-tight font-bold tracking-tight">{day.name}</h1>
        <p className="mt-1 text-sm text-ink-soft">{day.focus}</p>

        <div className="mt-3 flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-line">
            <Clock size={14} />
            {plan.sessionLength} min
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-line">
            <Flame size={14} />
            {plan.scheme.sets} × {plan.scheme.reps}
          </span>
        </div>
      </header>

      {/* Warm-up */}
      <section className="mt-6 rounded-2xl bg-accent-soft p-4 ring-1 ring-accent/20">
        <h2 className="text-xs font-bold tracking-wide text-ink uppercase">First, warm up</h2>
        <ul className="mt-2.5 space-y-1.5">
          {WARM_UP.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Exercise list */}
      <section className="mt-7">
        <h2 className="text-xs font-bold tracking-wide text-muted uppercase">Today&rsquo;s moves</h2>

        <ol className="mt-3 space-y-2.5">
          {day.exercises.map((exercise, i) => (
            <li key={exercise.id}>
              <Link
                to={`/workout/exercise/${exercise.id}`}
                className="flex items-center gap-3 rounded-2xl bg-card p-3.5 ring-1 ring-line transition active:scale-[0.99] hover:ring-muted/40"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-sm font-bold text-brand-dark">
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
