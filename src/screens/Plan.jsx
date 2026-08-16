import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Flame,
  Sparkle,
} from '../components/Icons.jsx'
import { useProfile } from '../state/ProfileContext.jsx'
import { useSession } from '../state/SessionContext.jsx'
import { generatePlan } from '../data/planGenerator.js'

/** How many reasons show before the rest go behind a disclosure. */
const RATIONALE_PREVIEW = 3

/** Compact fact pill for the hero. */
function Meta({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-ink-soft ring-1 ring-brand/15">
      <Icon size={14} className="shrink-0 text-brand-dark" />
      {children}
    </span>
  )
}

export default function Plan() {
  const { profile } = useProfile()
  const { startDay } = useSession()
  const navigate = useNavigate()
  const plan = useMemo(() => generatePlan(profile), [profile])

  const [showAllReasons, setShowAllReasons] = useState(false)

  const answered = profile.goals.length > 0
  const firstDay = plan.days[0]

  const hiddenCount = Math.max(0, plan.rationale.length - RATIONALE_PREVIEW)
  const visibleReasons = showAllReasons
    ? plan.rationale
    : plan.rationale.slice(0, RATIONALE_PREVIEW)

  /** Open a day and hand off to the workout screen. */
  function openDay(index) {
    startDay(index)
    navigate('/workout')
  }

  return (
    <Screen
      showBack
      action={
        <Link
          to="/goals"
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-ink-soft ring-1 ring-line transition hover:text-ink hover:ring-muted/40"
        >
          Edit answers
        </Link>
      }
      footer={
        <>
          <Button onClick={() => openDay(1)}>
            Start Day 1
            <ArrowRight size={20} />
          </Button>
          <p className="mt-2.5 text-center text-xs text-muted">
            {firstDay.name} · {firstDay.exercises.length} moves · about {plan.sessionLength} min
          </p>
        </>
      }
    >
      {/* Hero — kept short so the week starts above the fold. */}
      <div className="-mx-5 -mt-2 bg-brand-soft px-5 pt-4 pb-5">
        <div className="flex items-center gap-1.5 text-brand-dark">
          <Sparkle size={16} />
          <span className="text-[11px] font-bold tracking-wide uppercase">Your plan is ready</span>
        </div>

        <h1 className="mt-2 text-[1.75rem] leading-tight font-bold tracking-tight text-balance">
          {plan.title}
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          {plan.weeks} weeks · {plan.splitName} · built for{' '}
          {plan.primaryGoal ? plan.primaryGoal.label.toLowerCase() : 'a steady start'}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Meta icon={Calendar}>{plan.daysPerWeek}× per week</Meta>
          <Meta icon={Clock}>{plan.sessionLength} min</Meta>
          <Meta icon={Flame}>
            {plan.scheme.sets} × {plan.scheme.reps}
          </Meta>
        </div>
      </div>

      {!answered && (
        <div className="mt-4 rounded-2xl bg-accent-soft p-4 ring-1 ring-accent/25">
          <p className="text-sm leading-relaxed text-ink-soft">
            This is a sample plan built from default answers.{' '}
            <Link to="/goals" className="font-semibold text-ink underline underline-offset-2">
              Answer a few questions
            </Link>{' '}
            to make it yours.
          </p>
        </div>
      )}

      {/* The week is the payoff, so it comes first. */}
      <section className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xs font-bold tracking-wide text-muted uppercase">Your week</h2>
          <span className="text-[11px] text-muted">Tap a day to start it</span>
        </div>

        <div className="mt-3 space-y-3">
          {plan.days.map((day) => (
            <article key={day.key} className="overflow-hidden rounded-2xl bg-card ring-1 ring-line">
              <button
                type="button"
                onClick={() => openDay(day.index)}
                className="flex w-full items-center gap-3 border-b border-line bg-cream/60 px-4 py-3 text-left transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-sm font-bold text-white">
                  {day.index}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] leading-tight font-semibold">{day.name}</h3>
                  <p className="mt-0.5 truncate text-xs text-muted">{day.focus}</p>
                </div>
                <span className="ml-auto shrink-0 text-xs font-medium text-muted">
                  {day.exercises.length} moves
                </span>
                <ChevronRight size={16} className="shrink-0 text-muted" />
              </button>

              <ul className="divide-y divide-line">
                {day.exercises.map((exercise) => (
                  <li key={exercise.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{exercise.name}</p>
                      <p className="mt-0.5 text-xs text-muted">{exercise.muscles}</p>
                    </div>
                    {exercise.isKnown && (
                      <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold tracking-wide text-brand-dark uppercase">
                        Known
                      </span>
                    )}
                    <span className="shrink-0 text-sm font-semibold text-ink-soft tabular-nums">
                      {exercise.sets} × {exercise.reps}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Supporting reasoning, denser and collapsed by default. */}
      <section className="mt-8">
        <h2 className="text-xs font-bold tracking-wide text-muted uppercase">Why this plan</h2>

        <ul className="mt-3 space-y-2 rounded-2xl bg-card p-4 ring-1 ring-line">
          {visibleReasons.map((reason) => (
            <li key={reason} className="flex gap-2.5">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />
              <span className="text-[13px] leading-relaxed text-ink-soft">{reason}</span>
            </li>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setShowAllReasons((shown) => !shown)}
            aria-expanded={showAllReasons}
            className="mt-2 w-full rounded-xl py-2 text-xs font-semibold text-brand transition hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {showAllReasons
              ? 'Show fewer reasons'
              : `Show ${hiddenCount} more reason${hiddenCount === 1 ? '' : 's'}`}
          </button>
        )}
      </section>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        Rest {plan.scheme.rest} between sets. Add a little weight whenever
        <br />
        the last rep still feels solid.
      </p>
    </Screen>
  )
}
