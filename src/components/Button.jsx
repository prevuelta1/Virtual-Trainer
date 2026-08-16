import { Link } from 'react-router-dom'

const BASE =
  'inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 text-base font-semibold transition active:scale-[0.985] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

const VARIANTS = {
  primary: 'bg-brand text-white shadow-sm shadow-brand/25 hover:bg-brand-dark',
  secondary: 'bg-card text-ink ring-1 ring-line hover:bg-cream',
  ghost: 'bg-transparent text-ink-soft hover:text-ink',
}

const SIZES = {
  md: 'h-12',
  lg: 'h-14',
}

/**
 * One button, rendered as a router `Link` when `to` is set and a `<button>`
 * otherwise, so screens don't have to care which they need.
 */
export default function Button({
  to,
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
