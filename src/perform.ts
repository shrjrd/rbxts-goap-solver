import type { GoalFacts } from './planner.js'


export const perform = (
  facts: GoalFacts,
  effects: GoalFacts,
): GoalFacts => {
  const result = { ...facts }

  for (const [key, value] of pairs(effects)) {
   result[key] = typeIs(value, 'number')
      ? value + (result[key] as number ?? 0)
      : value
  }

  return result
}
