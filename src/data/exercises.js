/*
  Sample exercise library for the prototype.

  `pattern` is what the plan generator selects against — one movement per slot,
  so a day always covers a balanced set of patterns rather than five variations
  of the same thing.

  `equipment` lists what a movement requires; an empty array means bodyweight.
  `level` 1 is learnable on day one, 2 wants a little confidence first.
  `avoidIf` matches the limitations collected during onboarding.
*/

export const EQUIPMENT = [
  { id: 'dumbbell', label: 'Dumbbells' },
  { id: 'barbell', label: 'Barbell' },
  { id: 'rack', label: 'Squat rack' },
  { id: 'bench', label: 'Bench' },
  { id: 'machine', label: 'Machines' },
  { id: 'cable', label: 'Cable station' },
  { id: 'kettlebell', label: 'Kettlebell' },
  { id: 'pullup-bar', label: 'Pull-up bar' },
  { id: 'bands', label: 'Resistance bands' },
]

export const ALL_EQUIPMENT_IDS = EQUIPMENT.map((item) => item.id)

/** Equipment each gym type starts with; the user can still refine it. */
export const GYM_PRESETS = {
  full: ALL_EQUIPMENT_IDS,
  home: ['dumbbell', 'bands', 'bench'],
  bodyweight: [],
}

export const PATTERN_LABELS = {
  squat: 'Squat',
  hinge: 'Hinge',
  lunge: 'Single leg',
  'push-h': 'Horizontal push',
  'push-v': 'Vertical push',
  'pull-h': 'Horizontal pull',
  'pull-v': 'Vertical pull',
  core: 'Core',
  carry: 'Carry',
}

export const EXERCISES = [
  // ---------- Squat ----------
  {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    pattern: 'squat',
    equipment: ['dumbbell'],
    level: 1,
    muscles: 'Quads, glutes, core',
    start: 'Start with a 15–20 lb dumbbell held at your chest.',
    cues: [
      'Hold the weight against your chest like a mug of coffee.',
      'Sit down between your hips, not backwards.',
      'Push the floor away to stand up.',
    ],
    mistakes: ['Heels lifting off the floor', 'Rushing down instead of controlling the descent'],
  },
  {
    id: 'bodyweight-squat',
    name: 'Bodyweight Squat',
    pattern: 'squat',
    equipment: [],
    level: 1,
    muscles: 'Quads, glutes',
    start: 'No weight — focus on depth and control.',
    cues: [
      'Feet about shoulder width, toes turned slightly out.',
      'Reach your arms forward as a counterbalance.',
      'Go as deep as you can without your back rounding.',
    ],
    mistakes: ['Knees caving inward', 'Cutting the depth short'],
  },
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    pattern: 'squat',
    equipment: ['barbell', 'rack'],
    level: 2,
    muscles: 'Quads, glutes, core',
    start: 'Start with the empty 45 lb bar for two sessions before adding weight.',
    cues: [
      'Set the bar across your upper back, not your neck.',
      'Take two steps back — no more.',
      'Brace your stomach like you are about to be poked.',
    ],
    mistakes: ['Setting the rack pins too high', 'Looking up instead of straight ahead'],
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    pattern: 'squat',
    equipment: ['machine'],
    level: 1,
    muscles: 'Quads, glutes',
    start: 'Start with one plate per side and adjust from there.',
    cues: [
      'Feet shoulder width in the middle of the platform.',
      'Lower until your knees reach about 90 degrees.',
      'Never lock your knees out hard at the top.',
    ],
    mistakes: ['Letting the lower back round off the pad', 'Bouncing at the bottom'],
  },

  // ---------- Hinge ----------
  {
    id: 'db-romanian-deadlift',
    name: 'Dumbbell Romanian Deadlift',
    pattern: 'hinge',
    equipment: ['dumbbell'],
    level: 1,
    muscles: 'Hamstrings, glutes, back',
    start: 'Start with 15 lb dumbbells — this one is about feel, not load.',
    cues: [
      'Push your hips back like closing a car door with them.',
      'Keep the dumbbells brushing your legs the whole way.',
      'Stop when you feel a stretch behind your thighs.',
    ],
    mistakes: ['Turning it into a squat', 'Rounding the upper back'],
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    pattern: 'hinge',
    equipment: [],
    level: 1,
    muscles: 'Glutes, hamstrings',
    start: 'Bodyweight to begin — add a dumbbell across the hips later.',
    cues: [
      'Heels close to your hips, toes up.',
      'Squeeze your glutes to lift, not your lower back.',
      'Pause for one second at the top.',
    ],
    mistakes: ['Arching the lower back at the top', 'Pushing through the toes'],
  },
  {
    id: 'barbell-deadlift',
    name: 'Barbell Deadlift',
    pattern: 'hinge',
    equipment: ['barbell'],
    level: 2,
    avoidIf: ['lower-back'],
    muscles: 'Hamstrings, glutes, back',
    start: 'Start at 65 lb so you can practise the setup without straining.',
    cues: [
      'Bar over the middle of your foot before you bend.',
      'Take the slack out of the bar before you pull.',
      'Stand up with the bar dragging up your legs.',
    ],
    mistakes: ['Jerking the bar off the floor', 'Hips shooting up before the bar moves'],
  },
  {
    id: 'kettlebell-swing',
    name: 'Kettlebell Swing',
    pattern: 'hinge',
    equipment: ['kettlebell'],
    level: 2,
    avoidIf: ['lower-back'],
    muscles: 'Glutes, hamstrings, core',
    start: 'Start with a 25 lb kettlebell.',
    cues: [
      'The swing is a hinge, not a squat.',
      'Snap your hips forward — your arms are just rope.',
      'The bell floats to chest height, no higher.',
    ],
    mistakes: ['Lifting with the arms', 'Squatting the weight up'],
  },

  // ---------- Single leg ----------
  {
    id: 'split-squat',
    name: 'Split Squat',
    pattern: 'lunge',
    equipment: [],
    level: 1,
    avoidIf: ['knees'],
    muscles: 'Quads, glutes, balance',
    start: 'Bodyweight first. Hold a rail if you need to.',
    cues: [
      'One long step forward, back heel up.',
      'Drop straight down, not forward.',
      'Most of your weight stays on the front foot.',
    ],
    mistakes: ['Stance too short', 'Front knee drifting past the toes'],
  },
  {
    id: 'db-step-up',
    name: 'Dumbbell Step-Up',
    pattern: 'lunge',
    equipment: ['dumbbell', 'bench'],
    level: 1,
    avoidIf: ['knees'],
    muscles: 'Quads, glutes',
    start: 'Use a knee-height bench and 10 lb dumbbells.',
    cues: [
      'Whole foot on the bench, not just the toes.',
      'Drive through the top leg — do not push off the floor.',
      'Lower yourself down under control.',
    ],
    mistakes: ['Hopping off the bottom leg', 'Using a box that is too tall'],
  },
  {
    id: 'reverse-lunge',
    name: 'Reverse Lunge',
    pattern: 'lunge',
    equipment: [],
    level: 1,
    avoidIf: ['knees'],
    muscles: 'Quads, glutes',
    start: 'Bodyweight, alternating legs.',
    cues: [
      'Step backwards, not forwards — easier on the knees.',
      'Back knee taps just short of the floor.',
      'Stand tall the whole time.',
    ],
    mistakes: ['Leaning the torso forward', 'Stepping back too narrow'],
  },

  // ---------- Horizontal push ----------
  {
    id: 'pushup',
    name: 'Push-Up',
    pattern: 'push-h',
    equipment: [],
    level: 1,
    muscles: 'Chest, shoulders, triceps',
    start: 'Hands on a bench or wall if floor push-ups are too hard yet.',
    cues: [
      'Hands slightly wider than your shoulders.',
      'Squeeze your glutes so your body is one straight line.',
      'Elbows angle back, not straight out.',
    ],
    mistakes: ['Hips sagging', 'Only going halfway down'],
  },
  {
    id: 'db-bench-press',
    name: 'Dumbbell Bench Press',
    pattern: 'push-h',
    equipment: ['dumbbell', 'bench'],
    level: 1,
    avoidIf: ['shoulders'],
    muscles: 'Chest, shoulders, triceps',
    start: 'Start with 20 lb dumbbells.',
    cues: [
      'Plant your feet flat on the floor.',
      'Lower until your elbows are level with the bench.',
      'Press the dumbbells slightly toward each other.',
    ],
    mistakes: ['Clanging the dumbbells together at the top', 'Flaring the elbows to 90 degrees'],
  },
  {
    id: 'chest-press-machine',
    name: 'Chest Press Machine',
    pattern: 'push-h',
    equipment: ['machine'],
    level: 1,
    muscles: 'Chest, shoulders, triceps',
    start: 'Set the seat so the handles line up with mid-chest. Start light.',
    cues: [
      'Adjust the seat first — this is the step everyone skips.',
      'Press smoothly, no locking out hard.',
      'Let the weight come back under control.',
    ],
    mistakes: ['Seat height set wrong', 'Letting the stack slam down'],
  },
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    pattern: 'push-h',
    equipment: ['barbell', 'bench', 'rack'],
    level: 2,
    avoidIf: ['shoulders'],
    muscles: 'Chest, shoulders, triceps',
    start: 'Start with the empty 45 lb bar. Use a spotter or safety arms.',
    cues: [
      'Eyes under the bar when you lie down.',
      'Touch the bar to your lower chest.',
      'Keep your wrists stacked over your elbows.',
    ],
    mistakes: ['Bouncing the bar off the chest', 'Lifting the hips off the bench'],
  },

  // ---------- Vertical push ----------
  {
    id: 'db-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    pattern: 'push-v',
    equipment: ['dumbbell'],
    level: 1,
    avoidIf: ['shoulders'],
    muscles: 'Shoulders, triceps',
    start: 'Start with 10–15 lb dumbbells.',
    cues: [
      'Start with the dumbbells at ear height.',
      'Press up and slightly together.',
      'Keep your ribs down — do not arch your back.',
    ],
    mistakes: ['Leaning back to cheat the weight up', 'Pressing too far in front'],
  },
  {
    id: 'pike-pushup',
    name: 'Pike Push-Up',
    pattern: 'push-v',
    equipment: [],
    level: 2,
    avoidIf: ['shoulders'],
    muscles: 'Shoulders, triceps',
    start: 'Hands on the floor, hips high. Elevate your feet later to progress.',
    cues: [
      'Make an upside-down V with your body.',
      'Lower the top of your head toward the floor.',
      'Keep your hips high the whole time.',
    ],
    mistakes: ['Letting the hips drop into a push-up', 'Flaring the elbows wide'],
  },

  // ---------- Horizontal pull ----------
  {
    id: 'db-row',
    name: 'One-Arm Dumbbell Row',
    pattern: 'pull-h',
    equipment: ['dumbbell'],
    level: 1,
    muscles: 'Upper back, lats, biceps',
    start: 'Start with a 20 lb dumbbell.',
    cues: [
      'Brace your free hand on a bench or your thigh.',
      'Pull the dumbbell toward your hip, not your shoulder.',
      'Let your shoulder blade move at the top.',
    ],
    mistakes: ['Twisting the torso to lift', 'Yanking with the arm only'],
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    pattern: 'pull-h',
    equipment: ['cable'],
    level: 1,
    muscles: 'Upper back, lats, biceps',
    start: 'Start at 40 lb on the stack.',
    cues: [
      'Sit tall with a small bend in the knees.',
      'Pull the handle to your belly button.',
      'Squeeze your shoulder blades together for a beat.',
    ],
    mistakes: ['Rocking back and forth', 'Shrugging the shoulders up'],
  },
  {
    id: 'inverted-row',
    name: 'Inverted Row',
    pattern: 'pull-h',
    equipment: [],
    level: 1,
    muscles: 'Upper back, biceps',
    start: 'Use a sturdy table edge or a low bar. Walk your feet in to make it easier.',
    cues: [
      'Grip slightly wider than your shoulders.',
      'Body stays in one straight line.',
      'Pull your chest to the bar, not your chin.',
    ],
    mistakes: ['Hips sagging toward the floor', 'Only pulling halfway up'],
  },

  // ---------- Vertical pull ----------
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    pattern: 'pull-v',
    equipment: ['cable'],
    level: 1,
    muscles: 'Lats, upper back, biceps',
    start: 'Start at 50 lb and lock your thighs under the pad.',
    cues: [
      'Grip just outside shoulder width.',
      'Pull the bar to your collarbone.',
      'Lean back only slightly — about 15 degrees.',
    ],
    mistakes: ['Pulling behind the neck', 'Using momentum from the whole body'],
  },
  {
    id: 'band-pulldown',
    name: 'Band Lat Pulldown',
    pattern: 'pull-v',
    equipment: ['bands'],
    level: 1,
    muscles: 'Lats, upper back',
    start: 'Anchor the band overhead in a door frame. Use a light band first.',
    cues: [
      'Kneel far enough back to feel tension at the top.',
      'Pull your elbows down toward your ribs.',
      'Control the band back up slowly.',
    ],
    mistakes: ['Letting the band snap back', 'Anchoring too low'],
  },
  {
    id: 'assisted-pullup',
    name: 'Assisted Pull-Up',
    pattern: 'pull-v',
    equipment: ['pullup-bar', 'bands'],
    level: 2,
    muscles: 'Lats, upper back, biceps',
    start: 'Loop a thick band over the bar and put one foot in it.',
    cues: [
      'Start from a dead hang with straight arms.',
      'Pull your elbows down to your sides.',
      'Lower yourself slowly — that part builds the strength.',
    ],
    mistakes: ['Kicking the legs for momentum', 'Dropping down fast'],
  },

  // ---------- Core ----------
  {
    id: 'plank',
    name: 'Plank',
    pattern: 'core',
    equipment: [],
    level: 1,
    muscles: 'Core, shoulders',
    start: 'Start with 3 sets of 20 seconds.',
    cues: [
      'Elbows directly under your shoulders.',
      'Squeeze your glutes — that is what makes it work.',
      'Breathe normally the whole time.',
    ],
    mistakes: ['Hips creeping up into a pike', 'Holding your breath'],
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    pattern: 'core',
    equipment: [],
    level: 1,
    muscles: 'Deep core',
    start: 'Bodyweight, slow and deliberate.',
    cues: [
      'Press your lower back flat into the floor.',
      'Extend the opposite arm and leg together.',
      'Move slowly — speed defeats the point.',
    ],
    mistakes: ['Lower back arching off the floor', 'Rushing the reps'],
  },
  {
    id: 'farmer-carry',
    name: 'Farmer Carry',
    pattern: 'carry',
    equipment: ['dumbbell'],
    level: 1,
    muscles: 'Core, grip, shoulders',
    start: 'Grab two 25 lb dumbbells and walk 30 seconds.',
    cues: [
      'Stand tall — chest up, shoulders back.',
      'Take short, controlled steps.',
      'Do not let the weights swing.',
    ],
    mistakes: ['Leaning to one side', 'Shrugging the shoulders up to the ears'],
  },
  {
    id: 'suitcase-carry',
    name: 'Suitcase Carry',
    pattern: 'carry',
    equipment: ['kettlebell'],
    level: 1,
    muscles: 'Core, obliques, grip',
    start: 'One 25 lb kettlebell in one hand. Swap sides halfway.',
    cues: [
      'One weight only — like carrying a heavy suitcase.',
      'Fight the urge to lean away from it.',
      'Keep both shoulders level the whole walk.',
    ],
    mistakes: ['Leaning toward the weight', 'Twisting the torso as you walk'],
  },
  {
    id: 'hollow-hold',
    name: 'Hollow Hold',
    pattern: 'core',
    equipment: [],
    level: 1,
    muscles: 'Deep core',
    start: 'Start with 3 sets of 15 seconds, knees bent if needed.',
    cues: [
      'Press your lower back into the floor first.',
      'Lift your shoulders and legs just off the ground.',
      'Bend your knees to make it easier.',
    ],
    mistakes: ['Lower back arching off the floor', 'Holding your breath'],
  },
]

export function exerciseById(id) {
  return EXERCISES.find((exercise) => exercise.id === id)
}
