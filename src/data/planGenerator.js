import { ALL_EQUIPMENT_IDS, EXERCISES } from './exercises.js'

/*
  Mock personalization.

  Deterministic rules, not a model — the same answers always produce the same
  plan. It reads every section of the interview so the result visibly changes
  when the user goes back and edits an answer.
*/

export const GOALS = [
  {
    id: 'get-stronger',
    label: 'Get stronger',
    blurb: 'Lift heavier over time and feel capable.',
  },
  {
    id: 'build-muscle',
    label: 'Build muscle',
    blurb: 'Add visible size and shape.',
  },
  {
    id: 'feel-healthier',
    label: 'Feel healthier',
    blurb: 'More energy, better sleep, less stiffness.',
  },
  {
    id: 'lose-fat',
    label: 'Lose fat',
    blurb: 'Keep muscle while leaning out.',
  },
  {
    id: 'build-confidence',
    label: 'Feel at home in the gym',
    blurb: 'Stop feeling lost on the gym floor.',
  },
]

/** Rep scheme keyed on the primary goal. */
const REP_SCHEMES = {
  'get-stronger': { sets: 4, reps: '5', rest: '2–3 min', focus: 'heavier weight, longer rest' },
  'build-muscle': { sets: 3, reps: '8–10', rest: '90 sec', focus: 'moderate weight, steady volume' },
  'feel-healthier': { sets: 3, reps: '10', rest: '60–90 sec', focus: 'comfortable weight, good form' },
  'lose-fat': { sets: 3, reps: '12–15', rest: '45–60 sec', focus: 'higher reps, shorter rest' },
  'build-confidence': { sets: 3, reps: '8', rest: '90 sec', focus: 'simple movements, repeated often' },
}

const DEFAULT_SCHEME = REP_SCHEMES['feel-healthier']

/** Which pattern goes in which slot, per day type. */
const DAY_TEMPLATES = {
  'Full Body A': ['squat', 'push-h', 'pull-h', 'hinge', 'core', 'carry'],
  'Full Body B': ['hinge', 'push-v', 'pull-v', 'lunge', 'core', 'carry'],
  'Full Body C': ['squat', 'push-h', 'pull-v', 'lunge', 'core', 'carry'],
  'Upper A': ['push-h', 'pull-h', 'push-v', 'pull-v', 'core', 'carry'],
  'Upper B': ['pull-h', 'push-h', 'pull-v', 'push-v', 'core', 'carry'],
  'Lower A': ['squat', 'hinge', 'lunge', 'core', 'carry'],
  'Lower B': ['hinge', 'squat', 'lunge', 'core', 'carry'],
}

const DAY_FOCUS = {
  'Full Body A': 'Everything, with a squat emphasis',
  'Full Body B': 'Everything, with a hinge emphasis',
  'Full Body C': 'Everything, mixed',
  'Upper A': 'Chest, back, shoulders',
  'Upper B': 'Back, chest, shoulders',
  'Lower A': 'Legs and glutes',
  'Lower B': 'Glutes and hamstrings',
}

/** Which day types make up the week, by training frequency. */
const SPLITS = {
  2: { name: 'Full body', days: ['Full Body A', 'Full Body B'] },
  3: { name: 'Full body', days: ['Full Body A', 'Full Body B', 'Full Body C'] },
  4: { name: 'Upper / lower', days: ['Upper A', 'Lower A', 'Upper B', 'Lower B'] },
  5: {
    name: 'Upper / lower + full body',
    days: ['Upper A', 'Lower A', 'Full Body A', 'Upper B', 'Lower B'],
  },
}

const PLAN_TITLES = {
  'Full body': 'Full Body Foundations',
  'Upper / lower': 'Upper / Lower Starter',
  'Upper / lower + full body': 'Five-Day Starter Build',
}

/** Longer sessions fit more movements. */
function exerciseCountFor(sessionLength) {
  if (sessionLength <= 30) return 4
  if (sessionLength <= 45) return 5
  return 6
}

/**
 * Which exercises this person can actually do — filtered by their equipment,
 * their confidence level, and anything they told us to work around.
 */
function buildPool(profile) {
  const equipment =
    profile.gymType === 'bodyweight'
      ? []
      : profile.equipment.length
        ? profile.equipment
        : ALL_EQUIPMENT_IDS

  // Level 2 movements (barbell lifts, swings, pull-ups) only unlock for someone
  // who says they're comfortable and has lifted before. "Curious but unsure"
  // stays on level 1, which matches what that option promises on screen.
  const maxLevel =
    profile.barbellComfort === 'comfortable' && profile.experience !== 'never' ? 2 : 1

  return EXERCISES.filter((exercise) => {
    const hasKit = exercise.equipment.every((item) => equipment.includes(item))
    const withinLevel = exercise.level <= maxLevel
    const safe = !(exercise.avoidIf ?? []).some((flag) => profile.limitations.includes(flag))
    return hasKit && withinLevel && safe
  })
}

/*
  Ranking for one slot, in priority order:

  1. Least used across the week — variety wins first, so a "known" movement
     can't pin itself to the top of every day.
  2. Movements the user already knows — a familiar first session.
  3. Most equipment used — if someone has a barbell and a rack, the barbell
     lift is the point; bodyweight versions are the fallback for people
     without the kit, not the default for people with it.
  4. Simplest first, as a tie-break.
*/
function rankCandidates(candidates, usageCount, knownExercises) {
  return [...candidates].sort((a, b) => {
    const aUsed = usageCount[a.id] ?? 0
    const bUsed = usageCount[b.id] ?? 0
    if (aUsed !== bUsed) return aUsed - bUsed

    const aKnown = knownExercises.includes(a.id) ? 0 : 1
    const bKnown = knownExercises.includes(b.id) ? 0 : 1
    if (aKnown !== bKnown) return aKnown - bKnown

    if (a.equipment.length !== b.equipment.length) return b.equipment.length - a.equipment.length

    return a.level - b.level
  })
}

/** Pick one exercise for a pattern slot. */
function pickExercise(pool, pattern, usedInDay, usageCount, knownExercises) {
  const candidates = pool.filter(
    (exercise) => exercise.pattern === pattern && !usedInDay.has(exercise.id),
  )
  return rankCandidates(candidates, usageCount, knownExercises)[0] ?? null
}

/**
 * Fill leftover slots when the template's patterns ran dry — a bodyweight-only
 * pool has no vertical pull, for example, and a short day shouldn't just end
 * one movement early because of it.
 *
 * Restricted to the patterns that day already trains, so a leg day never gets
 * topped up with a chest press.
 */
function pickFiller(pool, allowedPatterns, usedInDay, usageCount, knownExercises) {
  const candidates = pool.filter(
    (exercise) => allowedPatterns.includes(exercise.pattern) && !usedInDay.has(exercise.id),
  )
  return rankCandidates(candidates, usageCount, knownExercises)[0] ?? null
}

/** Core and carries close a session — everything else is the main work. */
const FINISHER_PATTERNS = ['core', 'carry']

function isFinisher(exercise) {
  return FINISHER_PATTERNS.includes(exercise.pattern)
}

/**
 * Plain-language reasons that quote the answers back at the user.
 * Takes the finished week so it can describe what was actually chosen rather
 * than what we intended to choose.
 */
function buildRationale(profile, split, scheme, primaryGoal, days) {
  const reasons = []
  const usesBarbell = days.some((day) =>
    day.exercises.some((exercise) => exercise.equipment.includes('barbell')),
  )

  if (primaryGoal) {
    reasons.push(
      `You picked "${primaryGoal.label}" as your main focus, so every session runs at ${scheme.sets} sets of ${scheme.reps} reps — ${scheme.focus}.`,
    )
  }

  reasons.push(
    `${profile.daysPerWeek} days a week at ${profile.sessionLength} minutes fits a ${split.name.toLowerCase()} split, so nothing gets skipped if you miss a day.`,
  )

  if (profile.experience === 'never') {
    reasons.push(
      'Since this is your first time lifting, every movement here is one you can learn on day one. No barbell required.',
    )
  } else if (profile.experience === 'tried') {
    reasons.push(
      'You have been in a gym before, so this builds on the basics rather than starting from zero.',
    )
  } else if (profile.experience === 'months') {
    reasons.push(
      'With a few months behind you, this adds structure to what you are already doing.',
    )
  }

  if (profile.barbellComfort === 'nervous') {
    reasons.push('You said barbells feel intimidating, so we left them out entirely for now.')
  } else if (profile.barbellComfort === 'curious') {
    reasons.push(
      'You are curious about barbells but not sure yet, so this starts with dumbbell versions. Add the bar once those feel easy.',
    )
  } else if (profile.barbellComfort === 'comfortable' && usesBarbell) {
    reasons.push('You are comfortable with a barbell, so the main lifts use one.')
  }

  if (profile.gymType === 'bodyweight') {
    reasons.push('Everything here works with no equipment at all.')
  } else if (profile.gymType === 'home') {
    reasons.push('Built around dumbbells and bands, so you never need a gym.')
  }

  if (profile.limitations.length > 0) {
    const named = profile.limitations
      .map((id) => LIMITATION_LABELS[id]?.toLowerCase())
      .filter(Boolean)
      .join(' and ')
    reasons.push(`We swapped out anything that tends to aggravate ${named}.`)
  }

  if (profile.knownExercises.length > 0) {
    reasons.push(
      `You already know ${profile.knownExercises.length} of these movements, so your first session should feel familiar.`,
    )
  }

  if (profile.activityLevel === 'sedentary') {
    reasons.push('We kept week one light on purpose — the goal is showing up, not soreness.')
  }

  return reasons
}

export const LIMITATION_LABELS = {
  knees: 'Knees',
  shoulders: 'Shoulders',
  'lower-back': 'Lower back',
}

/**
 * Turn a completed profile into a full training week.
 * Tolerates a half-finished profile so the screen never crashes mid-prototype.
 */
export function generatePlan(profile) {
  const primaryGoalId = profile.goals[0] ?? null
  const primaryGoal = GOALS.find((goal) => goal.id === primaryGoalId) ?? null
  const scheme = REP_SCHEMES[primaryGoalId] ?? DEFAULT_SCHEME

  const split = SPLITS[profile.daysPerWeek] ?? SPLITS[3]
  const pool = buildPool(profile)
  const slots = exerciseCountFor(profile.sessionLength)

  // Never-lifted beginners get one less working set while they learn.
  const sets = profile.experience === 'never' ? Math.max(2, scheme.sets - 1) : scheme.sets

  const usageCount = {}

  const days = split.days.map((dayName, index) => {
    const patterns = DAY_TEMPLATES[dayName] ?? DAY_TEMPLATES['Full Body A']
    const usedInDay = new Set()
    const chosen = []

    function take(exercise) {
      usedInDay.add(exercise.id)
      usageCount[exercise.id] = (usageCount[exercise.id] ?? 0) + 1
      chosen.push(exercise)
    }

    for (const pattern of patterns) {
      if (chosen.length >= slots) break
      const exercise = pickExercise(pool, pattern, usedInDay, usageCount, profile.knownExercises)
      if (exercise) take(exercise)
    }

    // A template's patterns can run dry — a bodyweight-only pool has no
    // vertical pull at all. Top the day back up rather than ending it short of
    // what the session length budgeted for.
    while (chosen.length < slots) {
      const filler = pickFiller(pool, patterns, usedInDay, usageCount, profile.knownExercises)
      if (!filler) break
      take(filler)
    }

    // Backfill appends, so re-sort to keep core and carries at the end of the
    // session rather than stranded mid-workout.
    const ordered = [
      ...chosen.filter((exercise) => !isFinisher(exercise)),
      ...chosen.filter(isFinisher),
    ]

    return {
      key: `day-${index + 1}`,
      index: index + 1,
      name: dayName,
      focus: DAY_FOCUS[dayName] ?? 'Full body',
      exercises: ordered.map((exercise) => {
        const timed = exercise.pattern === 'core' || exercise.pattern === 'carry'
        return {
          ...exercise,
          sets: timed ? 3 : sets,
          reps: timed ? '30 sec' : scheme.reps,
          rest: scheme.rest,
          isKnown: profile.knownExercises.includes(exercise.id),
        }
      }),
    }
  })

  const finalScheme = { ...scheme, sets }

  return {
    title: PLAN_TITLES[split.name] ?? 'Your Starter Plan',
    splitName: split.name,
    daysPerWeek: profile.daysPerWeek,
    sessionLength: profile.sessionLength,
    weeks: 8,
    primaryGoal,
    scheme: finalScheme,
    rationale: buildRationale(profile, split, finalScheme, primaryGoal, days),
    days,
  }
}
