/**
 * Horizontal segmented control for short, mutually exclusive choices
 * (days per week, session length).
 *
 * One indicator pill slides between slots instead of each button swapping its
 * own background, so changing the value reads as a single movement.
 */
export default function Segmented({ options, value, onChange }) {
  const activeIndex = options.findIndex((option) => option.value === value)
  const count = options.length

  // The track is `p-1.5` (0.375rem) on each side, so a slot is the remaining
  // width divided by the number of options.
  const slotWidth = `calc((100% - 0.75rem) / ${count})`

  return (
    <div className="relative flex rounded-2xl bg-line/50 p-1.5">
      {activeIndex >= 0 && (
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 rounded-xl bg-card shadow-sm transition-[left] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: slotWidth, left: `calc(0.375rem + ${activeIndex} * ${slotWidth})` }}
        />
      )}

      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
            className={`relative z-10 flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none ${
              selected ? 'text-ink' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
