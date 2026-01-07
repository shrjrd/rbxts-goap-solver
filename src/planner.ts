import { fastHash } from './fastHash.js'
import { isGoalReached } from './isGoalReached.js'
import { perform } from './perform.js'
import { sortPlanQueue } from './sortPlanQueue.js'


export type GoalFacts = Record<string, (boolean | number)>

export type Action = {
  name: string
  preconditions: GoalFacts // Conditions under which the action can be performed
  effects: GoalFacts // Changes that the action makes to the state of the world
  reward?: number
  priority?: number // This should be done very desirably/urgently, even if it gives few or no points
}

export function planner(
  currentState: GoalFacts,
  goal: GoalFacts,
  actions: Action[],
): Action[] | null {
  if (isGoalReached(goal, currentState)) return []

  const queue: {
    state: GoalFacts
    plan: Action[]
    totalUtility: number
  }[] = [{
    state: currentState,
    plan: [],
    totalUtility: 0,
  }]

  const visited = new Set<string>()

  while (queue.size() > 0) {
    // Sort the plan queue before processing the next step
    // minimize steps and at the same time maximize the meaning in these steps
    queue.sort((a, b) => sortPlanQueue(a, b) < 0)

    const { state, plan, totalUtility } = queue.shift()!
    const stateKey = fastHash(state)

    if (visited.has(stateKey)) continue
    visited.add(stateKey)

    if (isGoalReached(goal, state)) return plan

    // Check every action
    for (const action of actions) {
      // Can the action be performed
      if (isGoalReached(action.preconditions, state)) {
        const newState = perform(state, action.effects)
        const newPlan = [...plan, action]
        const actionUtility = (action.reward ?? 0) + (action.priority ?? 0)

        queue.push({
          state: newState,
          plan: newPlan,
          totalUtility: totalUtility + actionUtility,
        })
      }
    }
  }

  return null // Plan not found
}
