/*
  Mobile-first shell.

  On a phone the app fills the viewport. From `md` up it collapses into a
  centered device frame so the prototype can be demoed on a laptop without
  looking like a stretched-out website.
*/
export default function PhoneFrame({ children }) {
  return (
    <div className="min-h-dvh bg-cream md:grid md:min-h-dvh md:place-items-center md:bg-stone-200 md:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden justify-center pt-6 md:flex">
        <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
          Virtual Trainer · clickable prototype
        </p>
      </div>

      <div
        className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-cream md:h-[844px] md:min-h-0 md:w-[390px] md:rounded-[2.75rem] md:shadow-2xl md:shadow-stone-900/25 md:ring-1 md:ring-stone-900/10"
      >
        {children}
      </div>
    </div>
  )
}
