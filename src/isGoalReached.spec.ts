import { describe, expect, test } from 'vitest'
import { isGoalReached } from './isGoalReached'


describe('isGoalReached', () => {
  test('correctly compares values', () => {
    // Boolean facts
    expect(isGoalReached({ a: true, b: true }, { a: true, b: true })).toBe(true)
    expect(isGoalReached({ a: true, b: true }, { a: true, b: false })).toBe(false)
    expect(isGoalReached({ a: true, b: true }, { a: true })).toBe(false)

    // Numeric facts
    expect(isGoalReached({ ore: 3 }, { ore: 3 })).toBe(true) // Exactly 3
    expect(isGoalReached({ ore: 3 }, { ore: 4 })).toBe(true) // Surplus
    expect(isGoalReached({ ore: 3 }, { ore: 2 })).toBe(false) // Shortage
    expect(isGoalReached({ ore: 3, wheat: 2 }, { ore: 3, wheat: 2 })).toBe(true) // Multiple resources
    expect(isGoalReached({ ore: 3, wheat: 2 }, { ore: 4, wheat: 1 })).toBe(false) // Shortage of one resource

    // Mixed facts
    expect(isGoalReached({ ore: 3, has_settlement: true }, { ore: 3, has_settlement: true })).toBe(true)
    expect(isGoalReached({ ore: 3, has_settlement: true }, { ore: 2, has_settlement: true })).toBe(false)
  })
})
