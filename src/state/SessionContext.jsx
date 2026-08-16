import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/*
  State for one workout in progress: which day is open, and what has been
  logged set by set. Separate from the profile because this resets every time
  a session starts, while the profile persists across the whole prototype.
*/

const SessionContext = createContext(null)

function blankSets(count) {
  return Array.from({ length: count }, () => ({ weight: '', reps: '', done: false }))
}

export function SessionProvider({ children }) {
  const [activeDayIndex, setActiveDayIndex] = useState(1)
  const [log, setLog] = useState({}) // { [exerciseId]: [{ weight, reps, done }] }
  const [startedAt, setStartedAt] = useState(null)
  const [finishedAt, setFinishedAt] = useState(null)

  /** Open a day and clear anything logged against the previous one. */
  const startDay = useCallback((index) => {
    setActiveDayIndex(index)
    setLog({})
    setStartedAt(null)
    setFinishedAt(null)
  }, [])

  const beginSession = useCallback(() => {
    setStartedAt((current) => current ?? Date.now())
    setFinishedAt(null)
  }, [])

  const finishSession = useCallback(() => setFinishedAt(Date.now()), [])

  /** Read the logged sets for an exercise, seeding blanks on first touch. */
  const setsFor = useCallback(
    (exerciseId, totalSets) => log[exerciseId] ?? blankSets(totalSets),
    [log],
  )

  const updateSet = useCallback((exerciseId, setIndex, patch, totalSets) => {
    setLog((current) => {
      const existing = current[exerciseId] ?? blankSets(totalSets)
      return {
        ...current,
        [exerciseId]: existing.map((set, i) => (i === setIndex ? { ...set, ...patch } : set)),
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      activeDayIndex,
      startDay,
      log,
      setsFor,
      updateSet,
      startedAt,
      finishedAt,
      beginSession,
      finishSession,
    }),
    [
      activeDayIndex,
      startDay,
      log,
      setsFor,
      updateSet,
      startedAt,
      finishedAt,
      beginSession,
      finishSession,
    ],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used inside a SessionProvider')
  }
  return context
}
