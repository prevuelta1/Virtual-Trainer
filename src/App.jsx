import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame.jsx'
import Welcome from './screens/Welcome.jsx'
import PlaceholderScreen from './screens/PlaceholderScreen.jsx'
import { FLOW } from './navigation/flow.js'

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
        <Route path="/" element={<Welcome />} />
        {FLOW.filter((screen) => screen.key !== 'welcome').map((screen) => (
          <Route
            key={screen.key}
            path={screen.path}
            element={<PlaceholderScreen screenKey={screen.key} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PhoneFrame>
  )
}
