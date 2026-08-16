import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from './Icons.jsx'
import { TOTAL_STEPS } from '../navigation/flow.js'

/** Thin progress bar for the onboarding interview. */
function ProgressBar({ step }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            i < step ? 'bg-brand' : 'bg-line'
          }`}
        />
      ))}
    </div>
  )
}

/**
 * Standard screen chrome: an optional back button + progress bar, a scrolling
 * body, and an optional pinned footer for the primary action.
 */
export default function Screen({
  title,
  step = null,
  showBack = true,
  eyebrow,
  action,
  footer,
  children,
}) {
  const navigate = useNavigate()

  // A screen with no back button and no title still needs the status-bar inset,
  // otherwise its content sits under the notch. The header always renders; only
  // its contents are conditional.
  const hasHeaderRow = showBack || step !== null || action

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="pt-safe shrink-0 px-5 pb-3">
        {hasHeaderRow && (
          <div className="flex h-11 items-center gap-3">
            {showBack && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Go back"
                className="-ml-2 grid size-9 place-items-center rounded-full text-ink-soft transition hover:bg-line/60 active:scale-95"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            {step !== null && (
              <span className="ml-auto text-xs font-semibold tracking-wide text-muted uppercase">
                Step {step} of {TOTAL_STEPS}
              </span>
            )}
            {action && <div className="ml-auto">{action}</div>}
          </div>
        )}

        {step !== null && <ProgressBar step={step} />}

        {(title || eyebrow) && (
          <div className={hasHeaderRow ? 'mt-5' : 'mt-2'}>
            {eyebrow && (
              <p className="text-[11px] font-bold tracking-wide text-brand-dark uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className="mt-1 text-2xl leading-tight font-bold tracking-tight text-balance">
                {title}
              </h1>
            )}
          </div>
        )}
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-5 pb-6">{children}</main>

      {footer && (
        <footer className="pb-safe shrink-0 border-t border-line bg-card/85 px-5 pt-4 backdrop-blur">
          {footer}
        </footer>
      )}
    </div>
  )
}
