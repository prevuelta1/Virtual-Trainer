import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import { ArrowRight, Calendar, Check, Sparkle, Target } from '../components/Icons.jsx'
import { useProfile } from '../state/ProfileContext.jsx'
import { generatePlan } from '../data/planGenerator.js'

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex-1 rounded-2xl bg-card/70 p-3 text-center ring-1 ring-brand/10">
      <span className="mx-auto grid size-8 place-items-center rounded-lg bg-brand-soft text-brand-dark">
        <Icon size={17} />
      </span>
      <p className="mt-2 text-base leading-none font-bold">{value}</p>
      <p className="mt-1 text-[11px] font-medium text-muted">{label}</p>
    </div>
  )
}

export default function Plan() {
  const { profile } = useProfile()
  const plan = useMemo(() => generatePlan(profile), [profile])

  const answered = profile.goals.length > 0

  return (
    <Screen
      showBack
      footer={
        <>
          <Button to="/workout">
            Start Day 1
            <ArrowRight size={20} />
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            <Link to="/goals" className="underline underline-offset-2 hover:text-ink-soft">
              Change my answers
            </Link>
          </p>
        </>
      }
    >
      {/* Hero */}
      <div className="-mx-5 -mt-2 bg-brand-soft px-5 pt-4 pb-6">
        <div className="flex items-center gap-1.5 text-brand-dark">
          <Sparkle size={16} />
          <span className="text-[11px] font-bold tracking-wide uppercase">Your plan is ready</span>
        </div>

        <h1 className="mt-2 text-[1.75rem] leading-tight font-bold tracking-tight text-balance">
          {plan.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {plan.weeks} weeks · {plan.splitName} · built for{' '}
          {plan.primaryGoal ? plan.primaryGoal.label.toLowerCase() : 'a steady start'}
        </p>

        <div className="mt-4 flex gap-2">
          <Stat icon={Calendar} value={`${plan.daysPerWeek}×`} label="per week" />
          <Stat icon={Target} value={`${plan.sessionLength}m`} label="per session" />
          <Stat icon={Sparkle} value={`${plan.scheme.sets}×${plan.scheme.reps}`} label="sets × reps" />
        </div>
      </div>

      {!answered && (
        <div className="mt-5 rounded-2xl bg-accent-soft p-4 ring-1 ring-accent/25">
          <p className="text-sm leading-relaxed text-ink-soft">
            This is a sample plan built from default answers.{' '}
            <Link to="/goals" className="font-semibold text-ink underline underline-offset-2">
              Answer a few questions
            </Link>{' '}
            to make it yours.
          </p>
        </div>
      )}

      {/* Why this plan */}
      <section className="mt-6">
        <h2 className="text-xs font-bold tracking-wide text-muted uppercase">Why this plan</h2>
        <ul className="mt-3 space-y-2.5 rounded-2xl bg-card p-4 ring-1 ring-line">
          {plan.rationale.map((reason) => (
            <li key={reason} className="flex gap-2.5">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-dark">
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="text-sm leading-relaxed text-ink-soft">{reason}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Week at a glance */}
      <section className="mt-7">
        <h2 className="text-xs font-bold tracking-wide text-muted uppercase">Your week</h2>

        <div className="mt-3 space-y-3">
          {plan.days.map((day) => (
            <article key={day.key} className="overflow-hidden rounded-2xl bg-card ring-1 ring-line">
              <header className="flex items-center gap-3 border-b border-line bg-cream/60 px-4 py-3">
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
              </header>

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

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        Rest {plan.scheme.rest} between sets. Add a little weight whenever
        <br />
        the last rep still feels solid.
      </p>
    </Screen>
  )
}
