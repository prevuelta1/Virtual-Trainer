import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import { ArrowRight, Sparkle } from '../components/Icons.jsx'
import { nextScreen, screenByKey } from '../navigation/flow.js'

/**
 * Stand-in for a screen that hasn't been designed yet. It keeps the whole flow
 * clickable end to end and documents what the real screen is meant to hold, so
 * the shell can be walked through before any of it exists.
 */
export default function PlaceholderScreen({ screenKey }) {
  const screen = screenByKey(screenKey)
  const next = nextScreen(screenKey)

  return (
    <Screen
      title={screen.title}
      step={screen.step}
      footer={
        next ? (
          <Button to={next.path}>
            Continue to {next.title.toLowerCase()}
            <ArrowRight size={20} />
          </Button>
        ) : (
          <Button to="/" variant="secondary">
            Back to the start
          </Button>
        )
      }
    >
      <p className="text-[15px] leading-relaxed text-ink-soft">{screen.blurb}</p>

      <div className="mt-6 rounded-2xl border border-dashed border-line bg-card/60 p-5">
        <div className="flex items-center gap-2 text-brand-dark">
          <Sparkle size={18} />
          <h2 className="text-xs font-bold tracking-wide uppercase">Coming next</h2>
        </div>

        {screen.willInclude.length > 0 ? (
          <ul className="mt-3 space-y-2.5">
            {screen.willInclude.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted">Not yet planned.</p>
        )}
      </div>
    </Screen>
  )
}
