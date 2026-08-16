import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/*
  Every answer the onboarding interview collects lives here, so the Plan screen
  can read the whole picture at once. Prototype-only: this is in-memory and
  resets on reload — no persistence, no backend.
*/
export const EMPTY_PROFILE = {
  // Goals — ordered by when they were picked, so goals[0] is the primary focus.
  goals: [],

  // Experience
  experience: null, // 'never' | 'tried' | 'months'
  barbellComfort: null, // 'nervous' | 'curious' | 'comfortable'
  limitations: [], // 'knees' | 'shoulders' | 'lower-back'

  // Schedule & equipment
  daysPerWeek: 3,
  sessionLength: 45, // minutes
  gymType: null, // 'full' | 'home' | 'bodyweight'
  equipment: [],

  // Current routine
  activityLevel: null, // 'sedentary' | 'active' | 'training'
  knownExercises: [],
  frustration: null,
}

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(EMPTY_PROFILE)

  /** Merge a patch of answers into the profile. */
  const update = useCallback((patch) => {
    setProfile((current) => ({ ...current, ...patch }))
  }, [])

  /** Add or remove one item from an array-valued answer. */
  const toggle = useCallback((key, item) => {
    setProfile((current) => {
      const list = current[key]
      return {
        ...current,
        [key]: list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
      }
    })
  }, [])

  const reset = useCallback(() => setProfile(EMPTY_PROFILE), [])

  const value = useMemo(() => ({ profile, update, toggle, reset }), [profile, update, toggle, reset])

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used inside a ProfileProvider')
  }
  return context
}
