import { Check } from './Icons.jsx'

/**
 * A tappable option card. Works for single-select and multi-select — the
 * caller owns the state, this just renders the chosen look.
 *
 * When `badge` is set its markup is always rendered and visibility is driven by
 * `badgeVisible`. Keeping it mounted is what lets the badge collapse out of one
 * card while it expands into another, rather than popping between them.
 */
export default function SelectCard({
  selected,
  onClick,
  title,
  blurb,
  badge,
  badgeVisible = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-start gap-3 rounded-2xl p-4 text-left transition duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.99] motion-reduce:transition-none ${
        selected
          ? 'bg-brand-soft ring-2 ring-brand'
          : 'bg-card ring-1 ring-line hover:bg-cream/50 hover:ring-muted/40'
      }`}
    >
      <span
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition duration-200 ease-out motion-reduce:transition-none ${
          selected ? 'border-brand bg-brand text-white' : 'border-line bg-card'
        }`}
      >
        <Check
          size={13}
          strokeWidth={3}
          className={`transition duration-200 ease-out motion-reduce:transition-none ${
            selected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center">
          <span className="text-[15px] leading-snug font-semibold">{title}</span>

          {badge && (
            <span
              className={`overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none ${
                badgeVisible ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0'
              }`}
            >
              <span className="ml-2 block rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wide whitespace-nowrap text-white uppercase">
                {badge}
              </span>
            </span>
          )}
        </span>

        {blurb && <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{blurb}</span>}
      </span>
    </button>
  )
}
