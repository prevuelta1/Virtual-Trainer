import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame.jsx'
import Welcome from './screens/Welcome.jsx'
import Goals from './screens/Goals.jsx'
import Experience from './screens/Experience.jsx'
import Schedule from './screens/Schedule.jsx'
import Routine from './screens/Routine.jsx'
import Plan from './screens/Plan.jsx'
import Workout from './screens/Workout.jsx'
import ExerciseDetails from './screens/ExerciseDetails.jsx'
import Tracking from './screens/Tracking.jsx'
import PlaceholderScreen from './screens/PlaceholderScreen.jsx'
import { FLOW } from './navigation/flow.js'

/** Screens that exist for real; anything else in the flow falls back to a placeholder. */
const BUILT = {
  welcome: Welcome,
  goals: Goals,
  experience: Experience,
  schedule: Schedule,
  routine: Routine,
  plan: Plan,
  workout: Workout,
  exercise: ExerciseDetails,
  tracking: Tracking,
}

/** Each screen should open at the top, the way a native push does. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.querySelector('main')?.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <PhoneFrame>
      <ScrollToTop />
      <Routes>
        {FLOW.map((screen) => {
          const Built = BUILT[screen.key]
          return (
            <Route
              key={screen.key}
              path={screen.path}
              element={Built ? <Built /> : <PlaceholderScreen screenKey={screen.key} />}
            />
          )
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PhoneFrame>
  )
}
