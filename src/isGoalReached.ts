import type { GoalFacts } from './planner.js'


export const isGoalReached = (
  goal: GoalFacts,
  state: GoalFacts,
) => Object
  .entries(goal)
  .every(([key, value]) => (typeof value === 'number'
    ? state[key] as number >= value
    : state[key] as boolean == value))
