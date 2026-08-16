# Virtual Trainer

A mobile-first clickable prototype. Virtual Trainer asks a beginner about their goals,
experience, schedule, equipment, and current routine, then hands them a personalized
beginner strength program — so they know exactly what to do when they walk into the gym.

This is a **UX prototype**, not a production fitness app. Personalization is mocked, exercise
demos are placeholders, and there is no auth, payments, database, or API.

## Running locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default <http://localhost:5173>).

On a desktop browser the app renders inside a phone frame. Narrow the window below the `md`
breakpoint — or open the network URL on your phone — to see it full-bleed.

## Screen flow

Welcome → Goals → Experience → Schedule & Equipment → Current Routine → Personalized Plan →
Workout → Exercise Details → Workout Tracking

| Screen               | Route                          |
| -------------------- | ------------------------------ |
| Welcome              | `/`                            |
| Goals                | `/goals`                       |
| Experience           | `/experience`                  |
| Schedule & Equipment | `/schedule`                    |
| Current Routine      | `/routine`                     |
| Personalized Plan    | `/plan`                        |
| Workout              | `/workout`                     |
| Exercise Details     | `/workout/exercise/:exerciseId`|
| Workout Tracking     | `/workout/track`               |

All nine screens are built. `PlaceholderScreen` remains as the fallback for any future flow
entry that has no component yet.

## Layout

```
src/
  App.jsx                  routes, derived from the flow config
  main.jsx                 entry point; mounts both providers
  index.css                Tailwind import + design tokens
  navigation/flow.js       the ordered screen flow (single source of truth)
  state/
    ProfileContext.jsx     onboarding answers; persists across the session
    SessionContext.jsx     one workout in progress; resets when a day starts
    usePlan.js             usePlan() / useActiveDay() helpers
  data/
    exercises.js           28-movement sample library with cues and mistakes
    planGenerator.js       mock personalization — deterministic rules, no model
  components/
    PhoneFrame.jsx         mobile-first shell; phone frame on desktop
    Screen.jsx             back button, progress bar, scroll body, pinned footer
    Button.jsx             primary / secondary / ghost
    SelectCard.jsx         single- and multi-select option card
    Chip.jsx               small toggle pill
    Segmented.jsx          segmented control
    Field.jsx              labelled input group
    ExerciseVisual.jsx     placeholder for an exercise demonstration
    Icons.jsx              inline SVG icons
  screens/                 one file per screen
```

### How personalization works

`generatePlan(profile)` in `src/data/planGenerator.js` turns the interview answers into a
training week using deterministic rules — same answers in, same plan out. It picks a split
from the training frequency, filters the exercise library by available equipment, confidence
level, and any injuries, then ranks candidates for each movement-pattern slot by variety,
familiarity, and whether the exercise uses equipment the user actually has.

The "Why this plan" copy is generated from the same answers and reads the finished week, so
it never claims something the plan doesn't contain.

### Adding a real screen

1. Build it in `src/screens/`.
2. Add it to the `BUILT` map in `App.jsx`.

`flow.js` keeps the ordering, titles, and onboarding step numbers, so Back/Continue and the
progress bar keep working without extra wiring.

## Design notes

The palette is warm and calm on purpose — cream and teal with a coral accent, rather than the
black-and-red "hardcore gym" look. Beginners should feel invited in, not sized up. Tokens live
in the `@theme` block in `src/index.css`.
