/*
  Small inline stroke icons so the prototype stays dependency-free.
  All of them inherit `currentColor` and default to 24px.
*/
function Svg({ size = 24, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowRight(props) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  )
}

export function ArrowLeft(props) {
  return (
    <Svg {...props}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </Svg>
  )
}

export function Dumbbell(props) {
  return (
    <Svg {...props}>
      <path d="M4 9v6" />
      <path d="M20 9v6" />
      <rect x="6.5" y="6.5" width="3.5" height="11" rx="1.25" />
      <rect x="14" y="6.5" width="3.5" height="11" rx="1.25" />
      <path d="M10 12h4" />
    </Svg>
  )
}

export function Target(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </Svg>
  )
}

export function Calendar(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17" />
      <path d="M8 3.5v3" />
      <path d="M16 3.5v3" />
    </Svg>
  )
}

export function Compass(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15 9-2 4.5-4 1.5 2-4.5z" />
    </Svg>
  )
}

export function Check(props) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  )
}

export function Sparkle(props) {
  return (
    <Svg {...props}>
      <path d="M12 4.5 13.6 9 18 10.5 13.6 12 12 16.5 10.4 12 6 10.5 10.4 9z" />
      <path d="M18.5 16.5 19 18l1.5.5-1.5.5-.5 1.5-.5-1.5L16.5 18l1.5-.5z" />
    </Svg>
  )
}

export function Blueprint(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17" />
      <path d="M9 9.5v10" />
      <path d="M12.5 13h5" />
      <path d="M12.5 16.5h5" />
    </Svg>
  )
}
