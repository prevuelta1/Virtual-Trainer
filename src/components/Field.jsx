/** A labelled group of inputs inside a screen. */
export default function Field({ label, hint, children }) {
  return (
    <section className="mt-7 first:mt-0">
      <h2 className="text-xs font-bold tracking-wide text-muted uppercase">{label}</h2>
      {hint && <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{hint}</p>}
      <div className="mt-3">{children}</div>
    </section>
  )
}
