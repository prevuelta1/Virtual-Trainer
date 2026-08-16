import Button from '../components/Button.jsx'
import { ArrowRight, Blueprint, Compass, Dumbbell, Target } from '../components/Icons.jsx'

const VALUE_PROPS = [
  {
    icon: Compass,
    title: 'Walk in knowing the plan',
    body: 'Your exact exercises, sets, and reps for the day — no wandering the gym floor.',
  },
  {
    icon: Blueprint,
    title: 'Built around your life',
    body: 'Your goals, your schedule, and the equipment you actually have access to.',
  },
  {
    icon: Target,
    title: 'Made for beginners',
    body: 'Plain language, form cues on every movement, and weights that start where you are.',
  },
]

export default function Welcome() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <main className="min-h-0 flex-1 overflow-y-auto">
        {/* Warm header block so the first impression is inviting, not clinical. */}
        <div className="pt-safe relative overflow-hidden bg-brand-soft px-6 pb-10">
          <div className="absolute -top-16 -right-12 size-52 rounded-full bg-brand/10" />
          <div className="absolute -bottom-20 -left-14 size-44 rounded-full bg-accent/10" />

          <div className="relative pt-10">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-brand text-white">
                <Dumbbell size={20} />
              </span>
              <span className="text-sm font-bold tracking-tight text-brand-dark">
                Virtual Trainer
              </span>
            </div>

            <h1 className="mt-8 text-[2rem] leading-[1.1] font-bold tracking-tight text-balance text-ink">
              Know exactly what to do when you walk in.
            </h1>
            <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-ink-soft">
              Answer a few questions and get a beginner-friendly strength program built for your
              goals, your schedule, and your gym.
            </p>
          </div>
        </div>

        <div className="space-y-3 px-5 pt-6 pb-8">
          {VALUE_PROPS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex gap-3.5 rounded-2xl bg-card p-4 ring-1 ring-line"
            >
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-dark">
                <Icon size={20} />
              </span>
              <div>
                <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="pb-safe shrink-0 border-t border-line bg-card/85 px-5 pt-4 backdrop-blur">
        <Button to="/goals">
          Build my plan
          <ArrowRight size={20} />
        </Button>
        <p className="mt-3 text-center text-xs text-muted">
          Takes about 2 minutes · No account needed
        </p>
      </footer>
    </div>
  )
}
