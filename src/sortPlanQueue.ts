import type { Action, GoalFacts } from './planner.js'


export type ItemQueue = {
  state: GoalFacts
  plan: Action[]
  totalUtility: number
}

/**
 * Sort the plan queue before processing the next step
 * minimize steps and at the same time maximize the meaning in these steps
 */

export const sortPlanQueue = (a: ItemQueue, b: ItemQueue) => {
  // If two plans have the same length (same number of steps),
  // then we give preference to the one with the higher total "reward"
  if (a.plan.size() === b.plan.size()) return b.totalUtility - a.totalUtility

  // Otherwise, the plan with fewer steps gets priority
  // we try to reach the goal in the shortest possible way
  return a.plan.size() - b.plan.size()
}
