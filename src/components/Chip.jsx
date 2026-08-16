/** Small toggle pill, used for equipment and familiar exercises. */
export default function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full px-3.5 py-2 text-sm font-medium transition active:scale-[0.97] ${
        selected
          ? 'bg-brand text-white ring-1 ring-brand'
          : 'bg-card text-ink-soft ring-1 ring-line hover:ring-muted/40'
      }`}
    >
      {children}
    </button>
  )
}
