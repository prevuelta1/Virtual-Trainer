/**
 * Horizontal segmented control for short, mutually exclusive choices
 * (days per week, session length).
 */
export default function Segmented({ options, value, onChange }) {
  return (
    <div className="flex gap-1.5 rounded-2xl bg-line/50 p-1.5">
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
              selected ? 'bg-card text-ink shadow-sm' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
