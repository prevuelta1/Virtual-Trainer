import { Dumbbell, Play } from './Icons.jsx'

/*
  Stand-in for a real exercise demonstration.

  Deliberately styled as an intentional placeholder rather than a broken image:
  in a prototype it should read as "a video goes here", not as a bug.
*/
export default function ExerciseVisual({ name }) {
  return (
    <figure>
      <div className="relative grid aspect-4/3 place-items-center overflow-hidden rounded-2xl bg-brand-soft ring-1 ring-brand/15">
        {/* Soft shapes so the block isn't a flat empty rectangle. */}
        <div className="absolute -top-10 -right-8 size-40 rounded-full bg-brand/10" />
        <div className="absolute -bottom-12 -left-10 size-36 rounded-full bg-accent/10" />

        <div className="relative flex flex-col items-center">
          <span className="grid size-14 place-items-center rounded-full bg-card text-brand shadow-sm">
            <Play size={24} />
          </span>
          <span className="mt-3 flex items-center gap-1.5 text-brand-dark">
            <Dumbbell size={15} />
            <span className="text-[11px] font-bold tracking-wide uppercase">Demo placeholder</span>
          </span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted">
        A short {name.toLowerCase()} demonstration would play here.
      </figcaption>
    </figure>
  )
}
