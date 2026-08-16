import { Check } from './Icons.jsx'

/**
 * A tappable option card. Works for single-select and multi-select — the
 * caller owns the state, this just renders the chosen look.
 *
 * `badge` shows a small label in the corner (used for "Main focus").
 */
export default function SelectCard({ selected, onClick, title, blurb, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-start gap-3 rounded-2xl p-4 text-left transition active:scale-[0.99] ${
        selected
          ? 'bg-brand-soft ring-2 ring-brand'
          : 'bg-card ring-1 ring-line hover:ring-muted/40'
      }`}
    >
      <span
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition ${
          selected ? 'border-brand bg-brand text-white' : 'border-line bg-card'
        }`}
      >
        {selected && <Check size={13} strokeWidth={3} />}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-[15px] leading-snug font-semibold">{title}</span>
          {badge && (
            <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
              {badge}
            </span>
          )}
        </span>
        {blurb && <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{blurb}</span>}
      </span>
    </button>
  )
}
