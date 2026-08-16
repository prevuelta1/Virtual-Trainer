/*
  Mobile-first shell.

  On a phone the app fills the viewport. From `md` up it collapses into a
  centered device frame so the prototype can be demoed on a laptop without
  looking like a stretched-out website.

  The frame height is clamped rather than fixed. A hard 844px plus padding
  needs ~908px of viewport, which overflows a 13" laptop and turns the whole
  page into a scroller. Width stays at 390px on purpose: letting only the
  height flex is how a real app behaves across an SE versus a Pro Max — the
  content proportions are untouched, there is just less visible at once.
*/
export default function PhoneFrame({ children }) {
  return (
    <div className="relative min-h-dvh bg-cream md:grid md:min-h-dvh md:place-items-center md:bg-stone-200 md:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden justify-center pt-5 md:flex">
        <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
          Virtual Trainer · clickable prototype
        </p>
      </div>

      <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-cream md:h-[clamp(600px,calc(100dvh-5rem),844px)] md:w-[390px] md:min-h-0 md:rounded-[2.75rem] md:shadow-2xl md:shadow-stone-900/25 md:ring-1 md:ring-stone-900/10">
        {children}
      </div>
    </div>
  )
}
