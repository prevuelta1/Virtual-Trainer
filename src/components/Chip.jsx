import { Check } from './Icons.jsx'

/**
 * Small toggle pill, used for equipment and familiar exercises.
 *
 * The check expands in on selection so multi-select reads as multi-select
 * rather than as a colour change.
 */
export default function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium transition duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.97] motion-reduce:transition-none ${
        selected
          ? 'bg-brand text-white ring-1 ring-brand'
          : 'bg-card text-ink-soft ring-1 ring-line hover:bg-cream/50 hover:ring-muted/40'
      }`}
    >
      <span
        className={`overflow-hidden transition-all duration-200 ease-out motion-reduce:transition-none ${
          selected ? 'max-w-5 opacity-100' : 'max-w-0 opacity-0'
        }`}
      >
        <Check size={14} strokeWidth={3} className="mr-1.5 block" />
      </span>
      {children}
    </button>
  )
}
