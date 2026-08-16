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

| Screen             | Route               | Status      |
| ------------------ | ------------------- | ----------- |
| Welcome            | `/`                 | Built       |
| Goals              | `/goals`            | Placeholder |
| Experience         | `/experience`       | Placeholder |
| Schedule & Equipment | `/schedule`       | Placeholder |
| Current Routine    | `/routine`          | Placeholder |
| Personalized Plan  | `/plan`             | Placeholder |
| Workout            | `/workout`          | Placeholder |
| Exercise Details   | `/workout/exercise` | Placeholder |
| Workout Tracking   | `/workout/track`    | Placeholder |

Every route is reachable today — placeholders carry Back/Continue so the flow can be walked
end to end.

## Layout

```
src/
  App.jsx                  routes, derived from the flow config
  main.jsx                 entry point
  index.css                Tailwind import + design tokens
  navigation/flow.js       the ordered screen flow (single source of truth)
  components/
    PhoneFrame.jsx         mobile-first shell; phone frame on desktop
    Screen.jsx             back button, progress bar, scroll body, pinned footer
    Button.jsx             primary / secondary / ghost
    Icons.jsx              inline SVG icons
  screens/
    Welcome.jsx
    PlaceholderScreen.jsx  stand-in driven by flow.js
```

### Adding a real screen

1. Build it in `src/screens/`.
2. Point its route at the new component in `App.jsx`.

`flow.js` keeps the ordering, titles, and onboarding step numbers, so Back/Continue and the
progress bar keep working without extra wiring.

## Design notes

The palette is warm and calm on purpose — cream and teal with a coral accent, rather than the
black-and-red "hardcore gym" look. Beginners should feel invited in, not sized up. Tokens live
in the `@theme` block in `src/index.css`.
