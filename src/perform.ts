import type { GoalFacts } from './planner.js'


export const perform = (
  facts: GoalFacts,
  effects: GoalFacts,
): GoalFacts => {
  const result = { ...facts }

  for (const key in effects) {
    const value = effects[key]

    result[key] = typeof value === 'number'
      ? value + (result[key] as number ?? 0)
      : value
  }

  return result
}
