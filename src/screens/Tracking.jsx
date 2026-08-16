import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import { ArrowRight, Check, ChevronRight, Clock, Flame, Sparkle } from '../components/Icons.jsx'
import { useSession } from '../state/SessionContext.jsx'
import { useActiveDay } from '../state/usePlan.js'

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

/** "8–10" → 9, "30 sec" → 30. Good enough for a prototype summary. */
function approximateReps(value) {
  const numbers = String(value).match(/\d+/g)
  if (!numbers) return 0
  const parsed = numbers.map(Number)
  return Math.round(parsed.reduce((a, b) => a + b, 0) / parsed.length)
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex-1 rounded-2xl bg-card p-4 text-center ring-1 ring-line">
      <span className="mx-auto grid size-9 place-items-center rounded-xl bg-brand-soft text-brand-dark">
        <Icon size={18} />
      </span>
      <p className="mt-2 text-lg leading-none font-bold">{value}</p>
      <p className="mt-1 text-[11px] font-medium text-muted">{label}</p>
    </div>
  )
}

export default function Tracking() {
  const { plan, day } = useActiveDay()
  const { setsFor, updateSet, log, startedAt, finishedAt, beginSession, finishSession, startDay } =
    useSession()
  const navigate = useNavigate()

  const [index, setIndex] = useState(0)
  const [restLeft, setRestLeft] = useState(null)

  // Deep-linking straight here still needs a start time for the summary.
  useEffect(() => {
    if (!startedAt) beginSession()
  }, [startedAt, beginSession])

  // Rest countdown.
  useEffect(() => {
    if (restLeft === null) return undefined
    if (restLeft <= 0) {
      setRestLeft(null)
      return undefined
    }
    const timer = setTimeout(() => setRestLeft((seconds) => seconds - 1), 1000)
    return () => clearTimeout(timer)
  }, [restLeft])

  const exercise = day.exercises[index]
  const isLast = index === day.exercises.length - 1

  const totalSets = day.exercises.reduce((sum, item) => sum + item.sets, 0)
  const doneSets = day.exercises.reduce(
    (sum, item) => sum + (log[item.id] ?? []).filter((set) => set.done).length,
    0,
  )

  // ------------------------------------------------------------ summary ----
  if (finishedAt) {
    const minutes = startedAt ? Math.max(1, Math.round((finishedAt - startedAt) / 60000)) : null

    const totalReps = day.exercises.reduce((sum, item) => {
      const logged = log[item.id] ?? []
      return (
        sum +
        logged
          .filter((set) => set.done)
          .reduce((s, set) => s + (Number(set.reps) || approximateReps(item.reps)), 0)
      )
    }, 0)

    const volume = day.exercises.reduce((sum, item) => {
      const logged = log[item.id] ?? []
      return (
        sum +
        logged
          .filter((set) => set.done)
          .reduce((s, set) => s + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0)
      )
    }, 0)

    const nextDay = plan.days.find((d) => d.index === day.index + 1) ?? plan.days[0]
    const finishedExercises = day.exercises.filter(
      (item) => (log[item.id] ?? []).filter((set) => set.done).length === item.sets,
    ).length

    return (
      <Screen
        showBack={false}
        footer={
          <>
            <Button
              onClick={() => {
                startDay(nextDay.index)
                navigate('/workout')
              }}
            >
              Up next: Day {nextDay.index}
              <ArrowRight size={20} />
            </Button>
            <p className="mt-2.5 text-center text-xs text-muted">
              <Link to="/plan" className="underline underline-offset-2 hover:text-ink-soft">
                Back to my plan
              </Link>
            </p>
          </>
        }
      >
        {/* Celebration banner — this is the moment the session pays off. */}
        <div className="-mx-5 -mt-2 overflow-hidden bg-brand-soft px-5 pt-9 pb-7 text-center">
          <div className="relative">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-white shadow-lg shadow-brand/25">
              <Check size={32} strokeWidth={2.5} />
            </span>

            <h1 className="mt-5 text-[1.75rem] leading-tight font-bold tracking-tight text-balance">
              Day {day.index} done.
            </h1>
            <p className="mt-1.5 text-sm font-semibold text-brand-dark">{day.name}</p>
            <p className="mx-auto mt-2.5 max-w-[30ch] text-[15px] leading-relaxed text-ink-soft">
              {doneSets} of {totalSets} sets logged. That&rsquo;s the hard part over.
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-2.5">
          <Stat icon={Check} value={doneSets} label="sets done" />
          <Stat icon={Flame} value={totalReps} label="total reps" />
          <Stat icon={Clock} value={minutes ? `${minutes}m` : '—'} label="elapsed" />
        </div>

        {volume > 0 && (
          <p className="mt-3 rounded-2xl bg-card p-4 text-center text-sm leading-relaxed text-ink-soft ring-1 ring-line">
            You moved <span className="font-bold text-ink">{volume.toLocaleString()} lb</span> in
            total today. Next session, add a little where the last rep still felt solid.
          </p>
        )}

        <section className="mt-7">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xs font-bold tracking-wide text-muted uppercase">What you did</h2>
            <span className="text-[11px] text-muted">
              {finishedExercises} of {day.exercises.length} complete
            </span>
          </div>

          <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl bg-card ring-1 ring-line">
            {day.exercises.map((item) => {
              const logged = (log[item.id] ?? []).filter((set) => set.done)
              const complete = logged.length === item.sets
              return (
                <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full ${
                      complete ? 'bg-brand text-white' : 'bg-line/70 text-muted'
                    }`}
                  >
                    {complete ? (
                      <Check size={13} strokeWidth={3} />
                    ) : (
                      <span className="size-1.5 rounded-full bg-current" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                  </div>

                  <span
                    className={`shrink-0 text-sm font-semibold tabular-nums ${
                      complete ? 'text-brand' : 'text-muted'
                    }`}
                  >
                    {logged.length}/{item.sets}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      </Screen>
    )
  }

  // ------------------------------------------------------------- active ----
  const sets = setsFor(exercise.id, exercise.sets)

  // The current set is simply the first one not yet ticked — derived, not stored.
  const currentSetIndex = sets.findIndex((set) => !set.done)
  const allSetsDone = currentSetIndex === -1

  function toggleSet(setIndex) {
    const nextDone = !sets[setIndex].done
    updateSet(exercise.id, setIndex, { done: nextDone }, exercise.sets)
    if (nextDone && !(isLast && setIndex === exercise.sets - 1)) {
      setRestLeft(plan.scheme.restSeconds)
    }
  }

  function advance() {
    if (isLast) {
      finishSession()
      return
    }
    setRestLeft(null)
    setIndex((i) => i + 1)
  }

  const resting = restLeft !== null

  return (
    <Screen
      showBack={false}
      footer={
        <>
          <Button onClick={advance}>
            {isLast ? 'Finish workout' : 'Next exercise'}
            <ArrowRight size={20} />
          </Button>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted">
            {index > 0 && (
              <button
                type="button"
                onClick={() => setIndex((i) => i - 1)}
                className="underline underline-offset-2 hover:text-ink-soft"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={finishSession}
              className="underline underline-offset-2 hover:text-ink-soft"
            >
              End workout early
            </button>
          </div>
        </>
      }
    >
      {/* Session progress */}
      <div className="pt-1">
        <div className="flex items-center justify-between text-xs font-semibold text-muted">
          <span>
            Exercise {index + 1} of {day.exercises.length}
          </span>
          <span className="tabular-nums">
            {doneSets}/{totalSets} sets
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300 motion-reduce:transition-none"
            style={{ width: `${totalSets ? (doneSets / totalSets) * 100 : 0}%` }}
          />
        </div>
      </div>

      <header className="mt-6">
        <h1 className="text-2xl leading-tight font-bold tracking-tight text-balance">
          {exercise.name}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          {exercise.sets} sets × {exercise.reps} · rest {exercise.rest}
        </p>
        <Link
          to={`/workout/exercise/${exercise.id}`}
          className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark"
        >
          How do I do this?
          <ChevronRight size={16} />
        </Link>
      </header>

      {/*
        Rest slot. Fixed height and always mounted, so the timer arriving or
        leaving never shifts the set rows below it. Idle it carries the rest
        guidance for this exercise, so the reserved space is never dead.
      */}
      <div
        aria-live="polite"
        className={`mt-5 flex h-20 items-center gap-3 rounded-2xl px-4 transition-colors duration-300 motion-reduce:transition-none ${
          resting ? 'bg-accent-soft ring-1 ring-accent/25' : 'bg-card ring-1 ring-line'
        }`}
      >
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 motion-reduce:transition-none ${
            resting ? 'bg-card text-accent' : 'bg-cream text-muted'
          }`}
        >
          <Clock size={22} />
        </span>

        {resting ? (
          <>
            <div className="min-w-0 flex-1">
              <p className="text-lg leading-none font-bold tabular-nums">{formatClock(restLeft)}</p>
              <p className="mt-1 text-xs text-ink-soft">Rest, then start your next set.</p>
            </div>
            <button
              type="button"
              onClick={() => setRestLeft(null)}
              className="shrink-0 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft ring-1 ring-accent/25 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Skip
            </button>
          </>
        ) : (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Rest {exercise.rest}</p>
            <p className="mt-0.5 text-xs text-muted">The timer starts when you tick a set.</p>
          </div>
        )}
      </div>

      {/* Set logging */}
      <section className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xs font-bold tracking-wide text-muted uppercase">Log your sets</h2>
          <span
            className={`text-[11px] font-semibold ${allSetsDone ? 'text-brand' : 'text-muted'}`}
          >
            {allSetsDone
              ? 'All sets logged'
              : `On set ${currentSetIndex + 1} of ${exercise.sets}`}
          </span>
        </div>

        <div className="mt-3 mb-2 flex items-center gap-2 px-1 text-[11px] font-bold tracking-wide text-muted uppercase">
          <span className="w-8 text-center">Set</span>
          <span className="flex-1 text-center">Weight</span>
          <span className="flex-1 text-center">Reps</span>
          <span className="w-11" />
        </div>

        <div className="space-y-2">
          {sets.map((set, i) => {
            const isCurrent = i === currentSetIndex

            return (
              <div
                key={i}
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex items-center gap-2 rounded-2xl p-2 transition duration-200 motion-reduce:transition-none ${
                  set.done
                    ? 'bg-brand-soft ring-1 ring-brand/25'
                    : isCurrent
                      ? 'bg-card ring-2 ring-brand'
                      : 'bg-card ring-1 ring-line'
                }`}
              >
                <span className="w-8 shrink-0">
                  <span
                    className={`mx-auto grid size-7 place-items-center rounded-lg text-xs font-bold transition duration-200 tabular-nums motion-reduce:transition-none ${
                      set.done
                        ? 'bg-brand/15 text-brand-dark'
                        : isCurrent
                          ? 'bg-brand text-white'
                          : 'text-muted'
                    }`}
                  >
                    {i + 1}
                  </span>
                </span>

                <input
                  type="text"
                  inputMode="decimal"
                  value={set.weight}
                  onChange={(e) =>
                    updateSet(exercise.id, i, { weight: e.target.value }, exercise.sets)
                  }
                  placeholder="lb"
                  aria-label={`Set ${i + 1} weight`}
                  className="h-11 min-w-0 flex-1 rounded-xl bg-cream text-center text-[15px] font-semibold ring-1 ring-line placeholder:font-normal placeholder:text-muted focus:ring-2 focus:ring-brand focus:outline-none"
                />

                <input
                  type="text"
                  inputMode="numeric"
                  value={set.reps}
                  onChange={(e) =>
                    updateSet(exercise.id, i, { reps: e.target.value }, exercise.sets)
                  }
                  placeholder={String(exercise.reps)}
                  aria-label={`Set ${i + 1} reps`}
                  className="h-11 min-w-0 flex-1 rounded-xl bg-cream text-center text-[15px] font-semibold ring-1 ring-line placeholder:font-normal placeholder:text-muted focus:ring-2 focus:ring-brand focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => toggleSet(i)}
                  aria-pressed={set.done}
                  aria-label={`Mark set ${i + 1} ${set.done ? 'not done' : 'done'}`}
                  className={`grid size-11 shrink-0 place-items-center rounded-xl transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-95 motion-reduce:transition-none ${
                    set.done
                      ? 'bg-brand text-white'
                      : isCurrent
                        ? 'bg-brand-soft text-brand-dark ring-1 ring-brand/30 hover:bg-brand hover:text-white'
                        : 'bg-cream text-muted ring-1 ring-line hover:text-ink-soft'
                  }`}
                >
                  <Check size={18} strokeWidth={2.5} />
                </button>
              </div>
            )
          })}
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <Sparkle size={14} className="mt-0.5 shrink-0" />
          {exercise.start}
        </p>
      </section>
    </Screen>
  )
}
