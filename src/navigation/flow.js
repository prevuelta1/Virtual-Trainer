/*
  The prototype's flow lives in one place so navigation, progress bars, and the
  placeholder screens all stay in sync as real screens get built.

  `step` is the position in the onboarding interview (used for the progress bar).
  Screens outside the interview leave it null.
*/
export const FLOW = [
  {
    key: 'welcome',
    path: '/',
    title: 'Welcome',
    step: null,
    blurb: 'The front door — what Virtual Trainer is and why it is worth two minutes.',
    willInclude: [],
  },
  {
    key: 'goals',
    path: '/goals',
    title: 'Your goals',
    step: 1,
    blurb: 'What does this person actually want out of lifting?',
    willInclude: [
      'Selectable goal cards (get stronger, build muscle, feel healthier, lose fat)',
      'A "what matters most" primary pick',
      'Plain-language copy — no jargon',
    ],
  },
  {
    key: 'experience',
    path: '/experience',
    title: 'Your experience',
    step: 2,
    blurb: 'How much has this person lifted before, and how confident do they feel?',
    willInclude: [
      'Experience level: never lifted / tried it / a few months',
      'Comfort with barbells and free weights',
      'Any injuries or movements to avoid',
    ],
  },
  {
    key: 'schedule',
    path: '/schedule',
    title: 'Schedule & equipment',
    step: 3,
    blurb: 'How many days a week, how long, and what gear is actually available?',
    willInclude: [
      'Days per week and session length',
      'Gym type: full gym / home basics / bodyweight only',
      'Equipment checklist with friendly icons',
    ],
  },
  {
    key: 'routine',
    path: '/routine',
    title: 'Current routine',
    step: 4,
    blurb: 'What (if anything) is this person already doing?',
    willInclude: [
      'Current activity level',
      'Exercises they already know',
      'What has not been working for them',
    ],
  },
  {
    key: 'plan',
    path: '/plan',
    title: 'Your plan',
    step: null,
    blurb: 'The payoff screen — a personalized beginner program, generated from the answers.',
    willInclude: [
      'Plan summary: split, days per week, duration',
      'Week-at-a-glance with each workout day',
      '"Why this plan" explanation in plain language',
      'Start-first-workout call to action',
    ],
  },
  {
    key: 'workout',
    path: '/workout',
    title: "Today's workout",
    step: null,
    blurb: 'The exercise list for one session, before the user starts lifting.',
    willInclude: [
      'Ordered exercise list with sets and reps',
      'Estimated duration and warm-up',
      'Tap any exercise for details',
    ],
  },
  {
    key: 'exercise',
    path: '/workout/exercise',
    title: 'Exercise details',
    step: null,
    blurb: 'Everything a beginner needs to do one movement without feeling lost.',
    willInclude: [
      'Placeholder demo visual',
      'Step-by-step form cues',
      'Common mistakes and how to fix them',
      'Suggested starting weight',
    ],
  },
  {
    key: 'tracking',
    path: '/workout/track',
    title: 'Workout tracking',
    step: null,
    blurb: 'Logging sets during the session, then finishing with a small win.',
    willInclude: [
      'Set-by-set logging with weight and reps',
      'Rest timer between sets',
      'Progress through the session',
      'Completion summary',
    ],
  },
]

/** Total number of onboarding interview steps (used by the progress bar). */
export const TOTAL_STEPS = FLOW.filter((screen) => screen.step !== null).length

export function screenByKey(key) {
  return FLOW.find((screen) => screen.key === key)
}

export function screenByPath(path) {
  return FLOW.find((screen) => screen.path === path)
}

function indexOfKey(key) {
  return FLOW.findIndex((screen) => screen.key === key)
}

/** The next screen in the flow, or null at the end. */
export function nextScreen(key) {
  const i = indexOfKey(key)
  return i >= 0 && i < FLOW.length - 1 ? FLOW[i + 1] : null
}

/** The previous screen in the flow, or null at the start. */
export function prevScreen(key) {
  const i = indexOfKey(key)
  return i > 0 ? FLOW[i - 1] : null
}
