import { useMemo } from 'react'
import { useProfile } from './ProfileContext.jsx'
import { generatePlan } from '../data/planGenerator.js'
import { useSession } from './SessionContext.jsx'

/** The generated plan for the current profile. */
export function usePlan() {
  const { profile } = useProfile()
  return useMemo(() => generatePlan(profile), [profile])
}

/** The plan plus whichever day the session currently has open. */
export function useActiveDay() {
  const plan = usePlan()
  const { activeDayIndex } = useSession()
  const day = plan.days.find((d) => d.index === activeDayIndex) ?? plan.days[0]
  return { plan, day }
}
