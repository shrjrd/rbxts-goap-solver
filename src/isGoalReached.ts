import type { GoalFacts } from './planner.js'

export const isGoalReached = (goal: GoalFacts, state: GoalFacts) => {
  for (const [key, value] of pairs(goal)) {
    if (typeIs(value, 'number')) {
      if (state[key] as number < value) return false
    } else {
      if (state[key] as boolean !== value) return false
    }
  }
  return true
}
