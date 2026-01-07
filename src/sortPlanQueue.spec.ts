import { expect, test } from '@rbxts/jest-globals'
import { Action } from './planner'
import { ItemQueue, sortPlanQueue } from './sortPlanQueue'


test('sorts by plan length, then by totalUtility', () => {
  const a = {} as unknown as Action

  const queue: ItemQueue[] = [
    { state: {}, plan: [a, a], totalUtility: 5 },
    { state: {}, plan: [a], totalUtility: 3 },
    { state: {}, plan: [a, a], totalUtility: 10 },
    { state: {}, plan: [a], totalUtility: 7 },
  ]

  const sorted = queue.sort((a, b) => sortPlanQueue(a, b) < 0)

  expect(sorted[0].plan.length).toBe(1)
  expect(sorted[0].totalUtility).toBe(7) // max utility with shortest plan

  expect(sorted[1].plan.length).toBe(1)
  expect(sorted[1].totalUtility).toBe(3)

  expect(sorted[2].plan.length).toBe(2)
  expect(sorted[2].totalUtility).toBe(10)

  expect(sorted[3].plan.length).toBe(2)
  expect(sorted[3].totalUtility).toBe(5)
})
